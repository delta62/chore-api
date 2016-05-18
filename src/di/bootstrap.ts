import { ReflectiveInjector, provide, Injector } from '@angular/core';
import { HANDLER_PROVIDERS } from '../handlers';
import { PERSISTENCE_PROVIDERS } from '../persistence';
import { SERVER_PROVIDERS } from '../server';

import { CONFIG_TOKEN, configFactory } from './config';
import { LOGGER_TOKEN, loggerFactory } from './bunyan';
import { SERVER_TOKEN, serverFactory } from './restify';

const INJECTOR_TOKEN: string = 'injector';

function injectorFactory(): Injector {
  return injector;
}

const injector: Injector = ReflectiveInjector.resolveAndCreate([
  SERVER_PROVIDERS,
  HANDLER_PROVIDERS,
  PERSISTENCE_PROVIDERS,

  provide(INJECTOR_TOKEN, { useFactory: injectorFactory }),
  provide(CONFIG_TOKEN,   { useFactory: configFactory }),
  provide(SERVER_TOKEN,   { useFactory: serverFactory }),
  provide(LOGGER_TOKEN,   { useFactory: loggerFactory })
]);


export function bootstrap(): Injector {
  return injector;
}
