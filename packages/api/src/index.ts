import Postgres from '@tpp/postgres';
import { isDev } from '@tpp/shared';
import { createClient, RedisClientType } from 'redis';
import App from './App';
import config from './config';
import logger from './logger';

(async () => {
  try {
    await Postgres.init();
    logger.info('Connected to database.');

    let redis: RedisClientType;

    if (!isDev || process.env.USE_REDIS === 'true') {
      redis = createClient({
        url: config.auth.redis,
        legacyMode: true
      });

      await redis.connect();
      logger.info(`Connected to Redis.`);
    }

    new App(redis).start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
