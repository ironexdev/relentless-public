import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { CookieService } from '$lib/server/services/cookie-service';

export async function logoutAction(event: RequestEvent) {
	const { cookies } = event;

	CookieService.deleteAuthCookies(cookies);

	throw redirect(303, '/');
}
