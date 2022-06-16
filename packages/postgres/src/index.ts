import { isProd } from '@tpp/shared';
import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { defaultConfig } from './config';
import entitySchemas from './schemas';
import { PostgresConfig } from './types';

export let dataSource: DataSource;

const setup = (config: PostgresConfig = defaultConfig) => {
  dataSource = new DataSource({
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
    entities: entitySchemas,
    migrations: [`./dist/migrations/${isProd ? 'prod' : 'dev'}/*.js`],
    synchronize: !isProd,
    ...(config.uri && {
      ssl: { rejectUnauthorized: false }
    })
  });

  return dataSource;
};

const init = async (config?: PostgresConfig) => {
  if (!dataSource) setup(config);
  return dataSource.initialize();
};

export default { setup, init };

export * from './repositories';
export * from './types';
