import { dev } from '$app/environment';
import { EnvironmentEnum } from "$lib/enums/environment-enum";
import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

Sentry.init({
	dsn: env.PUBLIC_SENTRY_DSN,

	// Only enable Sentry in production (when dev is false)
	enabled: !dev,

	sendDefaultPii: true,

	environment: dev ? EnvironmentEnum.DEVELOPMENT : EnvironmentEnum.PRODUCTION,

	tracesSampleRate: 0
});

export const handleError = handleErrorWithSentry();