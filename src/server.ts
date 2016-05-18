import { ChoreBrowseHandler } from './handlers/chore-browse';
import { EndpointRegistrar } from './handlers/endpoint-registrar';
import { IConfig } from 'config';
import { Server, Request, Response, Next } from 'restify';
import { Logger } from 'bunyan';
import {
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class ChoreServer {
  constructor(
    @Inject('config') private config: IConfig,
    @Inject('restify.Server') private server: Server,
    @Inject('bunyan.Logger') private log: Logger,
    private endpointRegistrar: EndpointRegistrar) { }

  run(): void {
    let port = this.config.get('port');
    this.server.listen(port);
    this.log.info('Hello world');

    this.endpointRegistrar.registerHandlers({
        '/chores': ChoreBrowseHandler
    });

    this.server.on('after', (req, res, route, err) => {
      this.logRequest(req, res, err);
    });

    this.server.on('uncaughtException', (req, res, route, err) => {
      this.logRequest(req, res, err);
      res.statusCode = 500;
      res.send(err);
    });
  }

  private logRequest(req: Request, res: Response, err: any): void {
    let level = err ? 'error' : 'info';
    if (err) {
      this.log.error(err);
    }

    this.log[level]({
      method: req.method,
      statusCode: res.statusCode,
      path: req.path
    });
  }
}

export var SERVER_PROVIDERS = [
  ChoreServer
];
