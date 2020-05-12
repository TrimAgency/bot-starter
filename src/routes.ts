import { Express, Request, Response, NextFunction } from 'express';

export const routes = (app: Express) => {
  app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ data: 'OK' });
  });
};
