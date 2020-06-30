import * as dotenv from 'dotenv';
import * as Sequelize from 'sequelize';
import { logger } from '../server';
const env = process.env.NODE_ENV;
if (env !== 'production') {
  dotenv.config();
}

const postgresPort = process.env.DATABASE_PORT
  ? parseInt(process.env.DATABASE_PORT)
  : 5432;

export const development: Sequelize.Options = {
  database: process.env.DATABASE,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'postgres',
  host: '127.0.0.1',
  port: postgresPort,
  timezone: 'America/New_York',
  logging: (msg: any) =>
    logger.verbose('DATABASE: ', { message: JSON.stringify(msg) }),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    evict: 0,
  },
};

export const test: Sequelize.Options = {
  database: process.env.TEST_DATABASE,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  // Defaults for Postgres
  host: '127.0.0.1',
  port: postgresPort,
  dialect: 'postgres',
  logging: false,
  timezone: 'America/New_York',
};

export const production: Sequelize.Options = {
  logging: false,
  timezone: 'America/New_York',
  port: 5432,
  dialect: 'postgres',
};
