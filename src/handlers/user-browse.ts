import { Injectable, Inject } from '@angular/core';
import { Endpoint } from './endpoint';
import { Logger } from 'bunyan';
import { Request, Response, Next, BadRequestError } from 'restify';
import { Db } from '../persistence';

@Injectable()
export class UserBrowseHandler {
  constructor(private db: Db, @Inject('bunyan.Logger') private log: Logger) { }

  @Endpoint()
  get(req: Request, res: Response, next: Next): void {
    this.db
      .connect('mongodb://localhost:27017/chores')
      .flatMap(this.db.getCollection('users'))
      .flatMap(this.db.find({ }, { _id: 0 }))
      .subscribe(res.send.bind(res), next, next);
  }

  @Endpoint()
  post(req: Request, res: Response, next: Next): void {
    let user = req.body;
    if (typeof user !== 'object') {
      throw new BadRequestError();
    }

    this.db
      .connect('mongodb://localhost:27017/chores')
      .flatMap(this.db.getCollection('users'))
      .flatMap(this.db.insert(user))
      .subscribe(_ => res.send(200), next, next);
  }
}
