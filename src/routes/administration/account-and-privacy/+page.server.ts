import type { Actions } from '@sveltejs/kit';
import { requestVerificationPinAction } from '$lib/server/auth/user/request-verification-pin-action.ts';
import { verifyChangeEmailAction } from '$lib/server/auth/user/verify-change-email-action.ts';
import { changeEmailAction } from '$lib/server/auth/user/change-email-action.ts';

export const actions: Actions = {
	'request-verification-pin': requestVerificationPinAction,
	'verify-change-email': verifyChangeEmailAction,
	'change-email': changeEmailAction
};
