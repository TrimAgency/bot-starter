import * as request from 'supertest';
import { app } from '../server';

// a helper function to make a GET request.
export const get = (url: string, params?: any) => {
  const httpRequest = request(app)
    .get(url)
    .set('Accept', 'application/json')
    .set('Origin', 'http://localhost:3000')
    .query(params);

  return httpRequest;
};

// a helper function to make a POST request.
export const post = (url: string, body: any) => {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set('Origin', 'http://localhost:3000');
  return httpRequest;
};

// a helper function to make a PUT request.
export const put = (url: string, body: any) => {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set('Origin', 'http://localhost:3000');
  return httpRequest;
};

// a helper function to make a PATCH request.
export const patch = (url: string, body: any) => {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set('Origin', 'http://localhost:3000');
  return httpRequest;
};
