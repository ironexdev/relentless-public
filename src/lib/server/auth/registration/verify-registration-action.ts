import { ToastEnum } from '$lib/enums/toast-enum';
import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import {
	t_verify_registration_invalid_or_expired_pin,
	t_verify_registration_success
} from '$lib/i18n/messages/t-verify-registration';
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

export async function verifyRegistrationAction(event: RequestEvent) {
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
	const verificationPin = await db.query.verificationTokens.findFirst({
		where: and(
			eq(verificationTokens.email, email),
			eq(verificationTokens.pin, pin),
			eq(verificationTokens.action, VerificationActionEnum.REGISTRATION),
			gte(verificationTokens.expires, new Date())
		)
	});

	if (!verificationPin) {
		return fail(422, { message: t_verify_registration_invalid_or_expired_pin(locale) });
	}

	const newUser = await db.transaction(async (tx) => {
		const [createdUser] = await tx
			.insert(users)
			.values({ email, emailVerified: new Date() })
			.returning();

		await tx.delete(verificationTokens).where(eq(verificationTokens.id, verificationPin.id));

		return createdUser;
	});

	await AuthService.createSession(cookies, newUser);

	CookieService.setToast(cookies, ToastEnum.SUCCESS, t_verify_registration_success(locale));

	const redirectUrl = getLocalizedUrl(locale, '/profile');

	throw redirect(303, redirectUrl);
}
