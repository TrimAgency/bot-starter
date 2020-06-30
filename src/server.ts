// Load environment
import * as dotenv from 'dotenv';
const env = process.env.NODE_ENV;
if (env !== 'production') {
  dotenv.config();
}

import * as e from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { headers } from './middleware/headers';
import { routes } from './routes';

import { sequelize } from './db/models';
import { mongo } from './mongoose/client';

import { createRedisClient } from './redis/client';

import { initSlackBot } from './bots/slack/init';

import { createWinstonLogger } from './logging/winston';

// Creates Redis Client
export const redis = createRedisClient();

// Create Logger
export const logger = createWinstonLogger();

// Express Server Setup
const port = process.env.PORT || 4000;

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
    logger.info(`*****\nExpress Server started on port: ${port}\n******`);
  });
}

// Connect to DB via Mongoose
mongo().then(() =>
  // Initialize Slackbot after DB is connected
  initSlackBot()
);

// Connect to DB via PG
sequelize()
  .sync({ force: process.env.NODE_ENV === 'test' })
  .catch((error: Error) => logger.error(error.message));
