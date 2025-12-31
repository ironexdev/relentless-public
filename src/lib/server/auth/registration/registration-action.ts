import { VERIFICATION_PIN_EXPIRATION_SECONDS } from '$lib/config';
import { ToastEnum } from '$lib/enums/toast-enum';
import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import { t_registration_verification_pin_sent } from '$lib/i18n/messages/t-registration';
import { getLocalizedUrl } from '$lib/routes';
import { registrationSchema } from '$lib/schemas';
import { db } from '$lib/server/database';
import { users } from '$lib/server/database/schema/users';
import { verificationTokens } from '$lib/server/database/schema/verification-tokens';
import { AuthService } from '$lib/server/services/auth-service';
import { CookieService } from '$lib/server/services/cookie-service';
import EmailService from '$lib/server/services/email/email-service';
import type { RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function registrationAction(event: RequestEvent) {
	const { request, cookies, locals, url } = event;
	const { locale } = locals;
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const validation = registrationSchema(locale).safeParse(data);

	if (!validation.success) {
		const { fieldErrors } = z.flattenError(validation.error);
		return fail(422, { email: fieldErrors.email?.[0] });
	}

	const { email } = validation.data;
	const user = await db.query.users.findFirst({ where: eq(users.email, email) });
	const message = t_registration_verification_pin_sent(locale);
	const redirectUrl = `${getLocalizedUrl(locale, '/verify-account')}?email=${encodeURIComponent(email)}`;

	CookieService.setToast(cookies, ToastEnum.SUCCESS, message);

	if (user) {
		// User already exists, but don't reveal this information
		const loginLink = `${url.origin}${getLocalizedUrl(locale, '/login')}`;

		await EmailService.sendRegistrationAttemptEmail(locale, email, loginLink);

		throw redirect(303, redirectUrl);
	}

	const pin = AuthService.generateVerificationPin();
	const expires = new Date(Date.now() + VERIFICATION_PIN_EXPIRATION_SECONDS * 1000);

	await db
		.insert(verificationTokens)
		.values({ email, pin, expires, action: VerificationActionEnum.REGISTRATION });

	await EmailService.sendRegistrationEmail(locale, email, pin);

	throw redirect(303, redirectUrl);
}
