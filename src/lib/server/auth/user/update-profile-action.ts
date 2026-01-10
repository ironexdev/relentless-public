import { VerificationActionEnum } from '$lib/enums/verification-action-enum';
import {
	t_validation_profile_link_taken,
	t_validation_invalid_pin
} from '$lib/i18n/messages/t-validation';
import { updateProfileSchema, updateProfileWithPinSchema } from '$lib/schemas';
import { db } from '$lib/server/database';
import { users } from '$lib/server/database/schema/users';
import { verificationTokens } from '$lib/server/database/schema/verification-tokens';
import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { and, eq, gte, ne } from 'drizzle-orm';
import { z } from 'zod';

export async function updateProfileAction(event: RequestEvent) {
	const { request, locals } = event;
	const { locale, user } = locals;

	if (!user) {
		return fail(401, { message: 'Unauthorized' });
	}

	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const dbUser = await db.query.users.findFirst({
		where: eq(users.id, user.userId)
	});

	if (!dbUser) {
		return fail(404, { message: 'User not found' });
	}

	const isFreshProfile =
		dbUser.username === null && dbUser.profileLink === null && dbUser.yearOfBirth === null;

	if (isFreshProfile) {
		const validation = updateProfileSchema(locale).safeParse(data);

		if (!validation.success) {
			const { fieldErrors } = z.flattenError(validation.error);
			return fail(422, {
				username: fieldErrors.username?.[0],
				profileLink: fieldErrors.profileLink?.[0],
				yearOfBirth: fieldErrors.yearOfBirth?.[0]
			});
		}

		const { username, profileLink, yearOfBirth } = validation.data;

		const existingProfileLink = await db.query.users.findFirst({
			where: and(eq(users.profileLink, profileLink), ne(users.id, user.userId))
		});

		if (existingProfileLink) {
			return fail(422, { profileLink: t_validation_profile_link_taken(locale) });
		}

		await db
			.update(users)
			.set({ username, profileLink, yearOfBirth })
			.where(eq(users.id, user.userId));

		return { success: true };
	}

	const validation = updateProfileWithPinSchema(locale).safeParse(data);

	if (!validation.success) {
		const { fieldErrors } = z.flattenError(validation.error);
		return fail(422, {
			username: fieldErrors.username?.[0],
			profileLink: fieldErrors.profileLink?.[0],
			yearOfBirth: fieldErrors.yearOfBirth?.[0],
			pin: fieldErrors.pin?.[0]
		});
	}

	const { username, profileLink, yearOfBirth, pin } = validation.data;

	const token = await db.query.verificationTokens.findFirst({
		where: and(
			eq(verificationTokens.email, user.email),
			eq(verificationTokens.pin, pin),
			eq(verificationTokens.action, VerificationActionEnum.UPDATE_PROFILE),
			gte(verificationTokens.expires, new Date())
		)
	});

	if (!token) {
		return fail(422, { pin: t_validation_invalid_pin(locale) });
	}

	const existingProfileLink = await db.query.users.findFirst({
		where: and(eq(users.profileLink, profileLink), ne(users.id, user.userId))
	});

	if (existingProfileLink) {
		return fail(422, { profileLink: t_validation_profile_link_taken(locale) });
	}

	await db.transaction(async (tx) => {
		await tx
			.update(users)
			.set({ username, profileLink, yearOfBirth })
			.where(eq(users.id, user.userId));

		await tx.delete(verificationTokens).where(eq(verificationTokens.id, token.id));
	});

	return { success: true };
}
