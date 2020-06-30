import * as winston from 'winston';
import { alignColorsAndTime, levels, configTransports } from './winston.config';

export const createWinstonLogger = () => {
  return winston.createLogger({
    levels: levels,
    format: winston.format.combine(alignColorsAndTime),
    transports: configTransports(),
  });
};
