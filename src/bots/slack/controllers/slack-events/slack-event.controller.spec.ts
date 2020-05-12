import { request } from '../../../../spec/spec-helpers';

describe('slack event controller API', () => {
  describe('Setup Confirmation', () => {
    it("should respond to Slack's confirmation request with the correct challenge string", async () => {
      const sampleBody = { challenge: 'this is a string' };

      await request
        .post('/api/messages')
        .set('Accept', 'application/json')
        .send(sampleBody)
        .expect(/this is a string/);
    });
  });
});
