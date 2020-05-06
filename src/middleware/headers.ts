import { Express, Response, NextFunction } from 'express';

export const headers = (app: Express) => {
  app.use(({ res, next }: { res: Response; next: NextFunction }) => {
    res.header('Content-Type', 'application/json');
    next();
  });
};
