import { ACCESS_TOKEN_EXPIRATION_SECONDS, REFRESH_TOKEN_EXPIRATION_SECONDS } from '$lib/config';
import { db } from '$lib/server/database';
import { refreshTokens } from '$lib/server/database/schema';
import type { Cookies } from '@sveltejs/kit';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { CookieService } from './cookie-service';

type UserPayload = {
	id: string;
	email: string;
};

export class AuthService {
	static async createSession(cookies: Cookies, user: UserPayload) {
		// Invalidate any existing refresh tokens for the user
		await db.delete(refreshTokens).where(eq(refreshTokens.userId, user.id));

		const { accessToken, refreshTokenCode } = this.generateTokens(user);
		const refreshTokenExpires = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_SECONDS * 1000);

		// Store the new refresh token in the database
		await db.insert(refreshTokens).values({
			userId: user.id,
			code: refreshTokenCode,
			expires: refreshTokenExpires
		});

		CookieService.setAuthCookies(cookies, accessToken, refreshTokenCode);
	}

	static async refreshSession(cookies: Cookies, user: UserPayload, oldTokenId: string) {
		const { accessToken, refreshTokenCode } = this.generateTokens(user);
		const refreshTokenExpires = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_SECONDS * 1000);

		await db.transaction(async (tx) => {
			await tx.delete(refreshTokens).where(eq(refreshTokens.id, oldTokenId));
			await tx.insert(refreshTokens).values({
				userId: user.id,
				code: refreshTokenCode,
				expires: refreshTokenExpires
			});
		});

		CookieService.setAuthCookies(cookies, accessToken, refreshTokenCode);
	}

	static generateVerificationPin() {
		return crypto.randomInt(100000, 999999).toString();
	}

	private static generateTokens(user: UserPayload) {
		const accessToken = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS
		});
		const refreshTokenCode = crypto.randomBytes(32).toString('hex');
		return { accessToken, refreshTokenCode };
	}
}
