import { Injectable, Inject, Injector } from '@angular/core';
import { Server } from 'restify';
import { ENDPOINT_META_KEY, EndpointMeta } from '../handlers/endpoint';

interface EndpointsDefinition {
  [path: string]: any;
}

@Injectable()
export class EndpointRegistrar {

  constructor(
    @Inject('restify.Server') private server:   Server,
    @Inject('injector')       private injector: Injector
  ) { }

  registerHandlers(endpoints: EndpointsDefinition): void {
    Object.getOwnPropertyNames(endpoints).forEach((prop: string) => {
      this.registerHandler(prop, endpoints[prop]);
    });
  }

  registerHandler(path: string, handler: any): void {
    let instance = this.injector.get(handler);
    let proto = Object.getPrototypeOf(instance);

    Object.getOwnPropertyNames(proto).forEach((prop) => {
      if (this.isEndpoint(proto, prop)) {
        let meta: EndpointMeta = Reflect.getOwnMetadata(ENDPOINT_META_KEY, proto, prop);
        this.registerEndpoint(meta.httpMethod, path, instance, prop);
      }
    });
  }

  private isEndpoint(proto: any, prop: string): boolean {
    return Reflect.hasOwnMetadata(ENDPOINT_META_KEY, proto, prop);
  }

  private registerEndpoint(httpMethod: string, path: string | RegExp, handlerInstance: any, methodName: string): void {
    let serverCallback = handlerInstance[methodName].bind(handlerInstance);
    this.server[httpMethod](path, serverCallback);
  }
}
