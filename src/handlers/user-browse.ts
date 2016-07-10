import { Injectable, Inject } from '@angular/core';
import { Endpoint } from './endpoint';
import { Logger } from 'bunyan';
import { Request, Response, Next, BadRequestError } from 'restify';
import { Db } from '../persistence';
import { UserValidator } from '../validators';
import slug = require('slug');

@Injectable()
export class UserBrowseHandler {
  constructor(private db: Db, @Inject('bunyan.Logger') private log: Logger, private validator: UserValidator) { }

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
    let userValidation = this.validator.validate(req.body);
    if (userValidation.errors.length) {
      let msg = userValidation.errors[0].message;
      let err = new BadRequestError(msg);
      return next(err);
    }

    let model = userValidation.model;
    model['slug'] = slug(model['name'], { lower: true });

    this.db
      .connect('mongodb://localhost:27017/chores')
      .flatMap(this.db.getCollection('users'))
      .flatMap(this.db.insert(model))
      .subscribe(_ => res.send(204), next, next);
  }
}
