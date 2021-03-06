import * as mongoose from 'mongoose';
import { MONGO_URI } from '../../constants';

export const db = async () => {
  if (process.env.NODE_ENV !== 'test') {
    return mongoose.connect(
      `${MONGO_URI}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log(
            `MongoDB connection error. Please make sure MongoDB is running. Error:${err}`
          );
        } else {
          console.log('****\n Connected to MongoDB! \n****');
        }
      }
    );
  } else return null;
};
