import { Sequelize } from 'sequelize';
import { databaseConnection } from './db';
import { initModels } from '../database';

const db = databaseConnection();

export const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
export const models = initModels(sequelize);
