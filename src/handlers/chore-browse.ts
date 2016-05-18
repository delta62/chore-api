import { Injectable } from '@angular/core';
import { Endpoint } from './endpoint';
import { Request, Response, Next } from 'restify';
import { Db } from '../persistence/db';

@Injectable()
export class ChoreBrowseHandler {
  constructor(private db: Db) { }

  @Endpoint()
  get(req: Request, res: Response, next: Next): void {
    this.db
      .connect('mongodb://localhost:27017/chores')
      .flatMap(this.db.getCollection('chores'))
      .flatMap(this.db.find())
      .subscribe(res.send, next);
  }
}
