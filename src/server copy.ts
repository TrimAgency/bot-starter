import * as dotenv from 'dotenv';
// Attach .env variables to process.env
const env = process.env.NODE_ENV;
if (env !== 'production') {
  dotenv.config();
}
import { Express } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { headers } from './middleware/headers';
import * as cors from 'cors';

import { mongo } from './mongoose/client';
import { sequelize } from './db/models';

import { initSlackBot } from './bots/slack/init';
import { createRedisClient } from './redis/client';
import './redis/jobs-index';
import { createWinstonLogger } from './logging/winston';

// Routes need to be imported last to avoid issues with Botkit and Bull
import { routes } from './routes';

// Intialize Logger
export const logger = createWinstonLogger();

// Creates Redis Client and initiates cron jobs
export const redis = createRedisClient();

// Server Setup
const port = process.env.PORT || 4000;
export const app: Express = express();
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
    logger.info(`Express Server started on port: ${port}`);
  });
}

// Connect to DB via PG
sequelize()
  .sync({ force: process.env.NODE_ENV === 'test' })
  .catch((error: Error) => logger.error(error.message));

// Connect to Bot Storage
mongo()
  .then(() => initSlackBot())
  .catch((error: Error) => logger.error(error.message));
