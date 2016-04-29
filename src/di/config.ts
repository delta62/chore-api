import * as config from 'config';

export const CONFIG_TOKEN: string = 'config';
export function configFactory(): config.IConfig {
  return config;
}
