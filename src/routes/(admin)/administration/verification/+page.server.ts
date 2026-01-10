import type { Actions } from '@sveltejs/kit';
import { requestVerificationPinAction } from '$lib/server/auth/user/request-verification-pin-action.ts';

export const actions: Actions = {
	'request-verification-pin': requestVerificationPinAction
};
