import { dev } from '$app/environment';
import { EnvironmentEnum } from "$lib/enums/environment-enum";
import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://dfd1908ee0c710ece94c97d63100b241@o4508173198360576.ingest.us.sentry.io/4510438297829376',

	// Only enable Sentry in production (when dev is false)
	enabled: !dev,

	sendDefaultPii: true,

	environment: dev ? EnvironmentEnum.DEVELOPMENT : EnvironmentEnum.PRODUCTION,

	tracesSampleRate: 0
});

export const handleError = handleErrorWithSentry();