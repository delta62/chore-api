import { Injectable, Inject } from '../di';
import { Server } from 'restify';

interface EndpointsDefinition {
  [path: string]: any;
}

@Injectable()
export class EndpointRegistrar {

  constructor(@Inject('restify.Server') private server: Server) { }

  registerEndpoints(endpoints: EndpointsDefinition): void {
    console.log('registering endpoints');
  }
}
