import { logger } from '../server';

export const logError = (error: Error, message: string) => {
  logger.error(message, JSON.stringify(error));
};
