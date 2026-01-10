import { VERIFICATION_PIN_EXPIRATION_SECONDS } from '$lib/config';
import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import { db } from '$lib/server/database';
import { verificationTokens } from '$lib/server/database/schema/verification-tokens';
import { AuthService } from '$lib/server/services/auth-service';
import EmailService from '$lib/server/services/email/email-service';
import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

const allowedActions = [
	VerificationActionEnum.CHANGE_EMAIL,
	VerificationActionEnum.DELETE_USER,
	VerificationActionEnum.UPDATE_PROFILE
] as const;

type AllowedAction = (typeof allowedActions)[number];

function isAllowedAction(action: string): action is AllowedAction {
	return allowedActions.includes(action as AllowedAction);
}

export async function requestVerificationPinAction(event: RequestEvent) {
	const { request, locals } = event;
	const { locale, user } = locals;

	if (!user) {
		return fail(401, { message: 'Unauthorized' });
	}

	const formData = await request.formData();
	const email = formData.get('email') as string;
	const action = formData.get('action') as string;

	if (!email || email !== user.email) {
		return fail(400, { message: 'Invalid email' });
	}

	if (!action || !isAllowedAction(action)) {
		return fail(400, { message: 'Invalid action' });
	}

	const pin = AuthService.generateVerificationPin();
	const expires = new Date(Date.now() + VERIFICATION_PIN_EXPIRATION_SECONDS * 1000);

	await db.insert(verificationTokens).values({ email, pin, expires, action });

	await EmailService.sendVerificationEmail(locale, email, pin);

	return { success: true };
}
