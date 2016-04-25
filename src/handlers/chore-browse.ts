/// <reference path="../../typings/main.d.ts" />

import { Injectable } from '../di';
import { Request, Response, Next } from 'restify';
import { MongoClient } from 'mongodb';
import { Observable } from 'rxjs';

@Injectable()
export class ChoreBrowseHandler {
  post(req: Request, res: Response, next: Next): void {
    res.send(201);
    next();
  }
}
