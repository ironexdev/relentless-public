import { sequence } from '@sveltejs/kit/hooks';
import {
	ACCESS_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_COOKIE_NAME,
	TOAST_COOKIE_NAME
} from '$lib/config';
import { defaultLocale, locales } from '$lib/i18n';
import {
	redirect,
	type Handle,
	type RequestEvent,
	type HandleServerError,
	isHttpError
} from '@sveltejs/kit';
import { LocaleEnum } from '$lib/enums/locale-enum';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/database';
import { and, eq, gte } from 'drizzle-orm';
import { refreshTokens } from '$lib/server/database/schema/refresh-tokens';
import { AuthService } from '$lib/server/services/auth-service';
import { CookieService } from '$lib/server/services/cookie-service';
import { getLocalizedUrl, routes } from '$lib/routes';
import { logger } from '$lib/server/logger';
import { EnvironmentEnum } from '$lib/enums/environment-enum';

export const handle: Handle = sequence(async ({ event, resolve }) => {
	const start = performance.now();
	const ip =
		event.request.headers.get('x-forwarded-for')?.split(',')[0] || event.getClientAddress();

	handleLang(event);
	handleToast(event);
	await handleAuth(event);

	const routeConfig = routes[event.url.pathname];

	if (routeConfig && routeConfig.protected && !event.locals.user) {
		const redirectUrl = getLocalizedUrl(event.locals.locale, '/login');

		logger.info(
			{
				type: 'access',
				ip,
				method: event.request.method,
				url: event.url.pathname,
				status: 303,
				duration: `${Math.round(performance.now() - start)}ms`
			},
			'Redirecting unauthenticated user'
		);

		return redirect(303, redirectUrl);
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.locale ?? defaultLocale)
	});

	const isHealthCheck = event.url.pathname === '/livez' || event.url.pathname === '/readyz';

	if (!isHealthCheck || response.status >= 400) {
		logger.info(
			{
				type: 'access',
				ip,
				method: event.request.method,
				url: event.url.pathname,
				status: response.status,
				duration: `${Math.round(performance.now() - start)}ms`
			},
			`${event.request.method} ${event.url.pathname}`
		);
	}

	return response;
});

export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();
	const ip =
		event.request.headers.get('x-forwarded-for')?.split(',')[0] || event.getClientAddress();
	const status = isHttpError(error) ? error.status : 500;

	// Determine if full error message should be shown to client
	// Always show for 4xx (client errors)
	// Show for 5xx only if NOT in production (for debugging)
	const isSafeToExpose = status < 500 || env.NODE_ENV !== EnvironmentEnum.PRODUCTION;

	const message =
		isSafeToExpose && isHttpError(error)
			? error.body.message
			: isSafeToExpose && error instanceof Error
				? error.message
				: 'Internal Server Error';

	if (status !== 404) {
		// Pino handles redaction here automatically based on logger.ts config
		logger.error(
			{
				type: 'error',
				ip,
				method: event.request.method,
				url: event.url.pathname,
				status,
				err: error,
				errorId
			},
			'Unhandled Server Error'
		);

		if (error instanceof Error && error.cause) {
			logger.error({ cause: error.cause }, 'Error Cause');
		}
	}

	return {
		message,
		errorId
	};
};

function handleLang(event: RequestEvent) {
	const pathname = event.url.pathname;
	const lang = pathname.split('/')[1];

	if (lang && (locales as string[]).includes(lang)) {
		event.locals.locale = lang as LocaleEnum;
	} else {
		event.locals.locale = defaultLocale;
	}
}

function handleToast(event: RequestEvent) {
	const toastCookie = event.cookies.get(TOAST_COOKIE_NAME);
	if (toastCookie) {
		event.locals.toast = JSON.parse(toastCookie);
		event.cookies.delete(TOAST_COOKIE_NAME, { path: '/' });
	}
}

async function handleAuth(event: RequestEvent) {
	const accessToken = event.cookies.get(ACCESS_TOKEN_COOKIE_NAME);
	const refreshTokenCode = event.cookies.get(REFRESH_TOKEN_COOKIE_NAME);

	if (accessToken) {
		try {
			const decoded = jwt.verify(accessToken, env.JWT_SECRET);
			if (typeof decoded === 'object' && 'userId' in decoded && 'email' in decoded) {
				event.locals.user = {
					userId: decoded.userId as string,
					email: decoded.email as string,
					createdAt: decoded.createdAd as Date
				};
				return;
			}
		} catch {
			// Access token is invalid, proceed to refresh logic
		}
	}

	if (refreshTokenCode) {
		const storedToken = await db.query.refreshTokens.findFirst({
			where: and(eq(refreshTokens.code, refreshTokenCode), gte(refreshTokens.expires, new Date())),
			with: {
				user: true
			}
		});

		if (storedToken && storedToken.user) {
			const { user, id: oldTokenId } = storedToken;
			await AuthService.refreshSession(event.cookies, user, oldTokenId);
			event.locals.user = { userId: user.id, email: user.email, createdAt: user.createdAt };
			return;
		} else {
			CookieService.deleteAuthCookies(event.cookies);
		}
	}

	event.locals.user = null;
}
