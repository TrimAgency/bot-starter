import * as Redis from 'redis';
import { RetryStrategyOptions } from 'redis';
import { REDIS_CONNECTION } from '../constants';

const url = REDIS_CONNECTION;
const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;

export const createRedisClient = () => {
  return Redis.createClient({
    url,
    port,
    retry_strategy: (options: RetryStrategyOptions) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error.
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    },
  });
};
