import Postgres from '@feedelity/postgres';
import { isDev } from '@feedelity/shared';
import { createClient, RedisClientType } from 'redis';
import App from './App';
import config from './config';
import logger from './logger';

(async () => {
  try {
    await Postgres.init();
    logger.info('Connect to database.');

    let redis: RedisClientType;

    if (!isDev || process.env.USE_REDIS === 'true') {
      redis = createClient({
        url: config.auth.redis,
        legacyMode: true
      });

      await redis.connect();
      logger.info(`Connected to Redis at ${config.auth.redis}`);
    }

    new App(redis).start();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();
