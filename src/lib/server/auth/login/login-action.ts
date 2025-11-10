import { VERIFICATION_PIN_EXPIRATION_SECONDS } from '$lib/config';
import { ToastEnum } from '$lib/enums/toast-enum';
import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import { t_login_verification_pin_sent } from '$lib/i18n/messages/t-login';
import { getLocalizedUrl } from '$lib/routes';
import { loginSchema } from '$lib/schemas';
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

export async function loginAction(event: RequestEvent) {
	const { request, cookies, locals, url } = event;
	const { locale } = locals;
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const validation = loginSchema(locale).safeParse(data);

	if (!validation.success) {
		const { fieldErrors } = z.flattenError(validation.error);
		return fail(422, { email: fieldErrors.email?.[0] });
	}

	const { email } = validation.data;
	const user = await db.query.users.findFirst({ where: eq(users.email, email) });
	const message = t_login_verification_pin_sent(locale);
	const redirectUrl = `${getLocalizedUrl(locale, '/verify-login')}?email=${encodeURIComponent(email)}`;

	CookieService.setToast(cookies, ToastEnum.SUCCESS, message);

	if (!user) {
		// User not found, but don't reveal this information
		const registrationLink = `${url.origin}${getLocalizedUrl(locale, '/create-account')}`;

		await EmailService.sendLoginAttemptEmail(locale, email, registrationLink);

		return redirect(303, redirectUrl);
	}

	const pin = AuthService.generateVerificationPin();
	const expires = new Date(Date.now() + VERIFICATION_PIN_EXPIRATION_SECONDS * 1000);

	await db
		.insert(verificationTokens)
		.values({ email, pin, expires, action: VerificationActionEnum.LOGIN });

	await EmailService.sendLoginEmail(locale, email, pin);

	return redirect(303, redirectUrl);
}
