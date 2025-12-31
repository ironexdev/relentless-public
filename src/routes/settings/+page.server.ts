import type { Actions } from '@sveltejs/kit';
import { requestVerificationPinAction } from '$lib/server/auth/user/request-verification-pin-action';
import { verifyChangeEmailAction } from '$lib/server/auth/user/verify-change-email-action';
import { changeEmailAction } from '$lib/server/auth/user/change-email-action';

export const actions: Actions = {
	'request-verification-pin': requestVerificationPinAction,
	'verify-change-email': verifyChangeEmailAction,
	'change-email': changeEmailAction
};
