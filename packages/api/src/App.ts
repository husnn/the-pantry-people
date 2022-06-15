import { UserRepository } from '@feedelity/postgres';
import { authCookieName } from '@feedelity/shared';
import cors from 'cors';
import express, { Application, Router } from 'express';
import session from 'express-session';
import { RedisClientType } from 'redis';
import config from './config';
import AuthController from './controllers/AuthController';
import logger, { default as log } from './logger';
import errorHandler from './middleware/errorHandler';
import initRoutes from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectRedis = require('connect-redis')(session);

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

    let store = new session.MemoryStore();

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

    const authController = new AuthController(userRepository);

    initRoutes(router, authController);

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
