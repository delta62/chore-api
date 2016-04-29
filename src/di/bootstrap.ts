import { Injector, provide } from './di';
import { HANDLER_PROVIDERS } from '../handlers';
import { PERSISTENCE_PROVIDERS } from '../persistence';
import { SERVER_PROVIDERS } from '../server';

import { CONFIG_TOKEN, configFactory } from './config';
import { LOGGER_TOKEN, loggerFactory } from './bunyan';
import { SERVER_TOKEN, serverFactory } from './restify';

export function bootstrap(): Injector {
  return Injector.resolveAndCreate([
      SERVER_PROVIDERS,
      HANDLER_PROVIDERS,
      PERSISTENCE_PROVIDERS,

      provide(CONFIG_TOKEN, { useFactory: configFactory }),
      provide(SERVER_TOKEN, { useFactory: serverFactory }),
      provide(LOGGER_TOKEN, { useFactory: loggerFactory })
  ]);
}
