import { Request, Response } from 'express';

export const slackEventsController = (req: Request, res: Response) => {
  // Generic Response to confirm connection to Slack App
  res.send(req.body.challenge);
};
