import { ToastEnum } from '$lib/enums/toast-enum';
import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import {
	t_user_email_change_success,
	t_user_email_invalid_or_expired_pin
} from '$lib/i18n/messages/t-user-modal';
import { getLocalizedUrl } from '$lib/routes';
import { verifySchema } from '$lib/schemas';
import { db } from '$lib/server/database';
import { users } from '$lib/server/database/schema/users';
import { verificationTokens } from '$lib/server/database/schema/verification-tokens';
import { CookieService } from '$lib/server/services/cookie-service';
import type { RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';
import { z } from 'zod';

export async function changeEmailAction(event: RequestEvent) {
	const { request, cookies, locals } = event;
	const { locale, user } = locals;

	if (!user) {
		return fail(401, { message: 'Unauthorized' });
	}

	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const validation = verifySchema(locale).safeParse(data);

	if (!validation.success) {
		const { fieldErrors } = z.flattenError(validation.error);
		return fail(422, {
			pin: fieldErrors.pin?.[0] || fieldErrors.email?.[0]
		});
	}

	const { email, pin } = validation.data;

	const token = await db.query.verificationTokens.findFirst({
		where: and(
			eq(verificationTokens.email, email),
			eq(verificationTokens.pin, pin),
			eq(verificationTokens.action, VerificationActionEnum.CHANGE_EMAIL),
			gte(verificationTokens.expires, new Date())
		)
	});

	if (!token) {
		return fail(422, { message: t_user_email_invalid_or_expired_pin(locale) });
	}

	await db.transaction(async (tx) => {
		await tx
			.update(users)
			.set({ email, emailVerified: new Date() })
			.where(eq(users.id, user.userId));

		await tx.delete(verificationTokens).where(eq(verificationTokens.id, token.id));
	});

	CookieService.deleteAuthCookies(cookies);
	CookieService.setToast(cookies, ToastEnum.SUCCESS, t_user_email_change_success(locale));

	const redirectUrl = getLocalizedUrl(locale, '/login');

	throw redirect(303, redirectUrl);
}
