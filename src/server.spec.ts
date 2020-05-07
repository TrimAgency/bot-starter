import { request } from './spec/spec-helpers';
import { app } from './server';

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('the Server', () => {
  describe('GET Index Endpoint', () => {
    it("should return a 200 'OK'", async () => {
      await request.get('/').expect(200);
    });
  });

  it('should NOT be listening in the TEST enviornment', async () => {
    const spy = jest.spyOn(app, 'listen');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
