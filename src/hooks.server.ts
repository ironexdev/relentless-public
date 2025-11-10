import {
	ACCESS_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_COOKIE_NAME,
	TOAST_COOKIE_NAME
} from '$lib/config';
import { defaultLocale, locales } from '$lib/i18n';
import { redirect, type Handle, type RequestEvent, error } from '@sveltejs/kit';
import { LocaleEnum } from '$lib/enums/locale-enum';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/database';
import { and, eq, gte } from 'drizzle-orm';
import { refreshTokens } from '$lib/server/database/schema/refresh-tokens';
import { AuthService } from '$lib/server/services/auth-service';
import { CookieService } from '$lib/server/services/cookie-service';
import { getLocalizedUrl, routes } from '$lib/routes';

export const handle: Handle = async ({ event, resolve }) => {
	handleLang(event);
	handleToast(event);
	await handleAuth(event);

	const routeConfig = routes[event.url.pathname];

	if (routeConfig && routeConfig.protected && !event.locals.user) {
		const redirectUrl = getLocalizedUrl(event.locals.locale, '/login');

		return redirect(303, redirectUrl);
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.locale ?? defaultLocale)
	});
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
					email: decoded.email as string
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
			event.locals.user = { userId: user.id, email: user.email };
			return;
		} else {
			CookieService.deleteAuthCookies(event.cookies);
		}
	}

	event.locals.user = null;
}
