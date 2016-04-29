import { createLogger, Logger } from 'bunyan';
export * from 'bunyan';

export const LOGGER_TOKEN: string = 'bunyan.Logger';
export function loggerFactory(): Logger {
  return createLogger({ name: 'chores' });
}
