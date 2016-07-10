import { UserValidator } from './user';

export * from './user';

export const VALIDATION_PROVIDERS: Array<any> = [
  UserValidator
];
