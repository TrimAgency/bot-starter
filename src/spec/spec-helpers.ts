import * as supertest from 'supertest';
import { app, redis } from '../server';
import { models } from '../db/models';

// Express
export const request = supertest(app);

// Cleanup Tests
afterAll(() => {
  models.map(async (m: any) => m.sequelize?.close());
  redis.quit();
});
