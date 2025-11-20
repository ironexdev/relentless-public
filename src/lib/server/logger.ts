import { EnvironmentEnum } from "$lib/enums/environment-enum";
import { NODE_ENV } from '$env/static/private';
import pino from 'pino';

const env = NODE_ENV;

export const logger = pino({
  level: env === EnvironmentEnum.DEVELOPMENT ? 'debug' : 'info',
  transport: env === EnvironmentEnum.DEVELOPMENT
    ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    }
    : undefined,
});