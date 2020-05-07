import { Express, Request, Response, NextFunction } from 'express';
import { slackEventsController } from './bot/controllers/slack-events.controller';

export const routes = (app: Express) => {
  app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ data: 'OK' });
  });

  // Slack Events Endpoint
  app.post('/api/messages', slackEventsController);
};
