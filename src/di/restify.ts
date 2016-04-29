import { Server, createServer } from 'restify';
export * from 'restify';

export const SERVER_TOKEN: string = 'restify.Server';
export function serverFactory(): Server {
  return createServer();
}
