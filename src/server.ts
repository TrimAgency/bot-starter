import { Response, Request, Express, NextFunction } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { headers } from './middleware/headers';
import { routes } from './routes';

// Server Setup
const port = process.env.SERVER_PORT || 4000;

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
    console.log(`*****\nSlackBot Server started on port: ${port}\n******`);
  });
}
