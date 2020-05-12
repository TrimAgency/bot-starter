import { MONGO_URI } from '../../constants';

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

export const storage = new MongoDbStorage({
  url: MONGO_URI,
});
