import { logError } from './log-error';

export const throwError = (error: Error, message: string = 'OOPS!') => {
  logError(error, message);
  throw new Error(message);
};
