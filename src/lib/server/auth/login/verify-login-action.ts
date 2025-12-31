import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import { t_verify_login_invalid_or_expired_pin } from '$lib/i18n/messages/t-verify-login';
import { getLocalizedUrl } from '$lib/routes';
import { verifySchema } from '$lib/schemas';
import { db } from '$lib/server/database';
import { users } from '$lib/server/database/schema/users';
import { verificationTokens } from '$lib/server/database/schema/verification-tokens';
import { AuthService } from '$lib/server/services/auth-service';
import { CookieService } from '$lib/server/services/cookie-service';
import type { RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';
import { z } from 'zod';

export async function verifyLoginAction(event: RequestEvent) {
	const { request, cookies, locals } = event;
	const { locale } = locals;
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const validation = verifySchema(locale).safeParse(data);

	if (!validation.success) {
		const { fieldErrors } = z.flattenError(validation.error);
		return fail(422, {
			email: fieldErrors.email?.[0],
			pin: fieldErrors.pin?.[0]
		});
	}

	const { email, pin } = validation.data;
	const token = await db.query.verificationTokens.findFirst({
		where: and(
			eq(verificationTokens.email, email),
			eq(verificationTokens.pin, pin),
			eq(verificationTokens.action, VerificationActionEnum.LOGIN),
			gte(verificationTokens.expires, new Date())
		)
	});

	if (!token) {
		return fail(422, { message: t_verify_login_invalid_or_expired_pin(locale) });
	}

	await db.delete(verificationTokens).where(eq(verificationTokens.id, token.id));

	const user = await db.query.users.findFirst({
		where: eq(users.email, email)
	});

	if (!user) {
		return fail(422, { message: t_verify_login_invalid_or_expired_pin(locale) }); // Technically 404, but that info should not be exposed
	}

	await AuthService.createSession(cookies, user);

	const redirectUrl = getLocalizedUrl(locale, '/profile');

	throw redirect(303, redirectUrl);
}
