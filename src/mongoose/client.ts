import * as mongoose from 'mongoose';
import { MONGO_URI } from '../constants';
import { logger } from '../server';

export const mongo = async () => {
  if (process.env.NODE_ENV !== 'test') {
    return mongoose.connect(
      `${MONGO_URI}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          logger.error(
            `MongoDB connection error. Please make sure MongoDB is running. Error:${err}`
          );
        } else {
          logger.info('****\n Connected to MongoDB! \n****');
        }
      }
    );
  } else return null;
};
