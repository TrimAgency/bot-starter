// Load environment
require('dotenv').config();
import * as e from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { headers } from './middleware/headers';
import { routes } from './routes';

import { createRedisClient } from './clients/redis/redis.client';
import { db } from './clients/db/mongoose.client';
import { initSlackBot } from './bots/slack/init';

// Creates Redis Client
export const redis = createRedisClient();

// Connect to DB via Mongoose
db();

// Initialize Slackbot
initSlackBot();

// Express Server Setup
const port = process.env.EXPRESS_SERVER_PORT || 4000;

export const app: e.Express = e();
const corsOptions: cors.CorsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
headers(app);
routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    console.log(`*****\nExpress Server started on port: ${port}\n******`);
  });
}
