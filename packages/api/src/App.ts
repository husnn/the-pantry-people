import { AuthService, CharityService, UserService } from '@tpp/core';
import { CharityRepository, UserRepository } from '@tpp/postgres';
import { authCookieName } from '@tpp/shared';
import cors from 'cors';
import express, { Application, Router } from 'express';
import session from 'express-session';
import { RedisClientType } from 'redis';
import config from './config';
import AuthController from './controllers/AuthController';
import CharityController from './controllers/CharityController';
import UserController from './controllers/UserController';
import logger, { default as log } from './logger';
import errorHandler from './middleware/errorHandler';
import initRoutes from './routes';
import GeoService from './services/GeoService';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectRedis = require('connect-redis')(session);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectSQLite = require('connect-sqlite3')(session);

class App {
  app: Application;

  constructor(redis: RedisClientType) {
    const app: Application = express();

    app.set('trust proxy', true);

    app.use(
      cors({
        origin: config.app.clientUrl,
        credentials: true,
        maxAge: 86400
      })
    );

    let store = new connectSQLite({
      db: 'sessions.sqlite'
    });

    if (redis) {
      store = new connectRedis({
        client: redis
      });

      logger.info('Using Redis for session storage.');
    }

    app.use(
      session({
        name: authCookieName,
        secret: config.auth.secret,
        store,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: config.app.isSecure,
          maxAge: config.auth.expiry
        }
      })
    );

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.disable('x-powered-by');

    app.get('/health', (req, res) => {
      res.status(200).send('Ok');
    });

    const router = Router();

    const userRepository = new UserRepository();
    const charityRepository = new CharityRepository();

    const authService = new AuthService(userRepository);
    const geoService = new GeoService();
    const userService = new UserService(userRepository, geoService);
    const charityService = new CharityService(
      userRepository,
      charityRepository,
      geoService
    );

    const authController = new AuthController(authService, charityService);
    const userController = new UserController(userService);
    const charityController = new CharityController(
      authService,
      charityService
    );

    initRoutes(router, authController, userController, charityController);

    app.use('/v1', router);

    app.use(errorHandler);

    this.app = app;
  }

  getInstance = (): Application => this.app;

  onError(err: string) {
    log.error(`Could not start app. ${err}`);
  }

  start() {
    const { protocol, host, port } = config.app;

    this.app
      .listen(port, host, () => {
        log.info(`App running at ${protocol}://${host}:${port}`);
      })
      .on('error', this.onError);
  }
}

export default App;
