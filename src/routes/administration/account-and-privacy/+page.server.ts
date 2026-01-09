import type { Actions } from '@sveltejs/kit';
import { verifyChangeEmailAction } from '$lib/server/auth/user/verify-change-email-action.ts';
import { changeEmailAction } from '$lib/server/auth/user/change-email-action.ts';
import { deleteUserAction } from '$lib/server/auth/user/delete-user-action.ts';

export const actions: Actions = {
	'verify-change-email': verifyChangeEmailAction,
	'change-email': changeEmailAction,
	'delete-user': deleteUserAction
};
