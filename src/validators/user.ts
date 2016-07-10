import { Injectable } from '@angular/core';
import schema = require('validate');

const userSchema = schema({
  name: {
    type: 'string',
    required: true,
    match: /.{3,}/
  }
});

export interface User {
  name: string;
}

export interface IValidationResult<T> {
  errors: Array<Error>;
  model: T;
}

@Injectable()
export class UserValidator {
  validate(user: any): IValidationResult<User> {
    return {
      errors: userSchema.validate(user),
      model: user
    };
  }
}
