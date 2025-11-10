import { verificationActionEnumAsArray } from '$lib/enums/verification-action-enum';
import { pgTable, varchar, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const dbActionEnum = pgEnum('action', verificationActionEnumAsArray);

export const verificationTokens = pgTable(
	'verification_tokens',
	{
		id: varchar('id', { length: 255 })
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		pin: varchar('pin', { length: 6 }).notNull(),
		action: dbActionEnum('action'),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
		email: varchar('email', { length: 320 }).notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
	},
	(vt) => [index('vt_email_action_idx').on(vt.email, vt.action), index('vt_email_idx').on(vt.email)]
);

export type SelectVerificationTokenType = InferSelectModel<typeof verificationTokens>;
export type InsertVerificationTokenType = InferInsertModel<typeof verificationTokens>;
