/// <reference path="../typings/main.d.ts" />

import 'reflect-metadata';
import * as restify from 'restify';
import * as bunyan from 'bunyan';
import { ChoreBrowseHandler } from './handlers/chore-browse';

let log = bunyan.createLogger({ name: 'chores' });
let server: restify.Server = restify.createServer();

server.listen(8080);
log.info('Hello world');

server.post('/chores', new ChoreBrowseHandler().post);

server.on('after', (req, res, route, err) => {
  logRequest(req, res, err);
});

server.on('uncaughtException', (req, res, route, err) => {
  logRequest(req, res, err);
  res.send(err);
});

function logRequest(req, res, err): void {
  let level = err ? 'error' : 'info';
  if (err) {
    log.error(err);
  }
  log[level]({ method: req.method, statusCode: res.statusCode, path: req.path });
}
