import { EnvironmentEnum } from "$lib/enums/environment-enum";
import { env } from '$env/dynamic/private';
import pino from 'pino';

export const logger = pino({
  level: env.NODE_ENV !== EnvironmentEnum.PRODUCTION ? 'debug' : 'info',

  // Use ISO time string instead of epoch (for JSON)
  timestamp: pino.stdTimeFunctions.isoTime,

  // Remove default 'pid' and 'hostname' fields (for JSON)
  base: undefined,

  redact: env.NODE_ENV === EnvironmentEnum.PRODUCTION
    ? ['req.headers.authorization', 'req.headers.cookie', 'password', 'token']
    : undefined,

  transport: env.NODE_ENV !== EnvironmentEnum.PRODUCTION
    ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        // Format timestamp for human readability (SYS:standard = yyyy-mm-dd HH:MM:ss)
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        messageFormat: '{msg}', // Optional: Customize message output
      },
    }
    : undefined,
});