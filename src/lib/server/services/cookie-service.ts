import {
	ACCESS_TOKEN_COOKIE_NAME,
	ACCESS_TOKEN_EXPIRATION_SECONDS,
	REFRESH_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_EXPIRATION_SECONDS,
	TOAST_COOKIE_EXPIRATION_SECONDS,
	TOAST_COOKIE_NAME
} from '$lib/config';
import type { ToastType } from '$lib/types/toast-type';
import { isProduction } from '$lib/utils/env-utils';
import type { Cookies } from '@sveltejs/kit';

export class CookieService {
	static setAuthCookies(cookies: Cookies, accessToken: string, refreshTokenCode: string) {
		cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
			httpOnly: true,
			path: '/',
			secure: isProduction(),
			maxAge: ACCESS_TOKEN_EXPIRATION_SECONDS
		});

		cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshTokenCode, {
			httpOnly: true,
			path: '/',
			secure: isProduction(),
			maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS
		});
	}

	static deleteAuthCookies(cookies: Cookies) {
		cookies.delete(ACCESS_TOKEN_COOKIE_NAME, { path: '/' });
		cookies.delete(REFRESH_TOKEN_COOKIE_NAME, { path: '/' });
	}

	static setToast(cookies: Cookies, type: ToastType, message: string) {
		cookies.set(TOAST_COOKIE_NAME, JSON.stringify({ type, message }), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: TOAST_COOKIE_EXPIRATION_SECONDS
		});
	}
}
