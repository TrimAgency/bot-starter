import * as dotenv from 'dotenv';
const env: string = process.env.NODE_ENV || '';
if (env !== 'production') {
  dotenv.config();
}
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
const config: any = require('../config');

import { User } from './user.model';
import { Project } from './project.model';

/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */
export const models = [User, Project];

export const sequelize = (): Sequelize => {
  const dbURI: string = process.env.DATABASE_URL || '';
  const dbOptions: SequelizeOptions = config[env];

  let db: Sequelize;

  if (env === 'production') {
    db = new Sequelize(dbURI, dbOptions);
  } else {
    db = new Sequelize(dbOptions);
  }

  db.addModels(models);
  return db;
};
