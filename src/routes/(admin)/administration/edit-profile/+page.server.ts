import type { Actions } from '@sveltejs/kit';
import { requestVerificationPinAction } from '$lib/server/auth/user/request-verification-pin-action';
import { updateProfileAction } from '$lib/server/auth/user/update-profile-action';

export const actions: Actions = {
	'request-verification-pin': requestVerificationPinAction,
	'update-profile': updateProfileAction
};
