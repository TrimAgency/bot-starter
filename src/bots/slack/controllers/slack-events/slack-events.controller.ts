import { Request, Response } from 'express';

export const slackEventsController = (req: Request, res: Response) => {
  // Generic Response to confirm connection to Slack App

  res.json(req.body.challenge);
};
