export const ENDPOINT_META_KEY: string = 'endpoint';

export interface EndpointMeta {
  httpMethod: string;
}

export function Endpoint(): Function {
  return(fn: Function, method: string): void => {
    let meta: EndpointMeta = {
      httpMethod: method
    };
    Reflect.defineMetadata(ENDPOINT_META_KEY, meta, fn, method);
  };
}
