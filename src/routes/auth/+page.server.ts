import { loginAction } from '$lib/server/auth/login/login-action';
import { verifyLoginAction } from '$lib/server/auth/login/verify-login-action';
import { registrationAction } from '$lib/server/auth/registration/registration-action';
import type { Actions } from '@sveltejs/kit';
import { logoutAction } from '$lib/server/auth/logout-action';
import { verifyRegistrationAction } from '$lib/server/auth/registration/verify-registration-action';

export const actions: Actions = {
	login: loginAction,
	'verify-login': verifyLoginAction,
	logout: logoutAction,
	registration: registrationAction,
	'verify-registration': verifyRegistrationAction
};
