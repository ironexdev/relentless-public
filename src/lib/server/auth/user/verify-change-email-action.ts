import { VERIFICATION_PIN_EXPIRATION_SECONDS } from '$lib/config';
import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import {
	t_user_email_invalid_email,
	t_user_email_invalid_or_expired_pin
} from '$lib/i18n/messages/t-user-modal';
import { db } from '$lib/server/database';
import { users } from '$lib/server/database/schema/users';
import { verificationTokens } from '$lib/server/database/schema/verification-tokens';
import { AuthService } from '$lib/server/services/auth-service';
import EmailService from '$lib/server/services/email/email-service';
import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';
import { z } from 'zod';
import { verifyChangeEmailSchema } from '$lib/schemas';

export async function verifyChangeEmailAction(event: RequestEvent) {
	const { request, locals, url } = event;
	const { locale, user } = locals;

	if (!user) {
		return fail(401, { message: 'Unauthorized' });
	}

	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const validation = verifyChangeEmailSchema(locale).safeParse(data);

	if (!validation.success) {
		const { fieldErrors } = z.flattenError(validation.error);
		return fail(422, {
			currentEmail: fieldErrors.currentEmail?.[0],
			newEmail: fieldErrors.newEmail?.[0],
			pin: fieldErrors.pin?.[0]
		});
	}

	const { currentEmail, newEmail, pin } = validation.data;

	if (currentEmail !== user.email) {
		return fail(400, { message: t_user_email_invalid_email(locale) });
	}

	const token = await db.query.verificationTokens.findFirst({
		where: and(
			eq(verificationTokens.email, currentEmail),
			eq(verificationTokens.pin, pin),
			eq(verificationTokens.action, VerificationActionEnum.CHANGE_EMAIL),
			gte(verificationTokens.expires, new Date())
		)
	});

	if (!token) {
		return fail(422, { message: t_user_email_invalid_or_expired_pin(locale) });
	}

	await db.delete(verificationTokens).where(eq(verificationTokens.id, token.id));

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, newEmail)
	});

	if (existingUser) {
		const loginLink = `${url.origin}/login`;

		await EmailService.sendChangeEmailAttemptEmail(locale, newEmail, loginLink);

		return { success: true };
	}

	const newPin = AuthService.generateVerificationPin();
	const expires = new Date(Date.now() + VERIFICATION_PIN_EXPIRATION_SECONDS * 1000);

	await db.insert(verificationTokens).values({
		email: newEmail,
		pin: newPin,
		expires,
		action: VerificationActionEnum.CHANGE_EMAIL
	});

	await EmailService.sendVerificationEmail(locale, newEmail, newPin);

	return { success: true };
}
