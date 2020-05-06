import { get } from './spec/spec-helpers';

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('GET Index Endpoint', () => {
  it("should return a 200 'OK'", async () => {
    const res = await get('/');
    expect(res.status).toEqual(200);
  });
});
