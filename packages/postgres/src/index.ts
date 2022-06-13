import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { defaultConfig } from './config';
import entitySchemas from './schemas';
import { PostgresConfig } from './types';

export let datasource = new DataSource({ type: 'postgres' });

export default {
  init: async (config: PostgresConfig = defaultConfig) => {
    datasource = new DataSource({
      type: 'postgres',
      ...(config.uri
        ? {
            url: config.uri
          }
        : {
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.username,
            password: config.password
          }),
      synchronize: process.env.NODE_ENV !== 'production',
      entities: entitySchemas,
      ...(config.uri && {
        ssl: { rejectUnauthorized: false }
      })
    });

    return datasource.initialize();
  }
};

export * from './repositories';
export * from './types';
