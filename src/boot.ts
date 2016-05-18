import 'reflect-metadata';
import { Injector, bootstrap } from './di';
import { ChoreServer } from './server';

let injector: Injector = bootstrap();
try {
  let server: ChoreServer = injector.get(ChoreServer);
  server.run();
} catch (ex) {
  console.error(ex);
}
