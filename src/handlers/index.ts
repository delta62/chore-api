import { ChoreBrowseHandler } from './chore-browse';
import { UserBrowseHandler } from './user-browse';
import { EndpointRegistrar } from './endpoint-registrar';

export * from './user-browse';
export * from './chore-browse';
export * from './endpoint-registrar';

export var HANDLER_PROVIDERS = [
  ChoreBrowseHandler,
  EndpointRegistrar,
  UserBrowseHandler
];
