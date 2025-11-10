import { users } from '$lib/server/database/schema/users';
import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { type InferInsertModel, relations } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm/table';
import crypto from 'crypto';

export const refreshTokens = pgTable(
	'refresh_tokens',
	{
		id: varchar('id', { length: 255 })
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		code: varchar('code', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
		userId: varchar('user_id', { length: 255 })
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
	},
	(rt) => [index('rt_user_id_code_idx').on(rt.userId, rt.code)]
);

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
	user: one(users, { fields: [refreshTokens.userId], references: [users.id] })
}));

export type SelectRefreshTokenType = InferSelectModel<typeof refreshTokens>;
export type InsertRefreshTokenType = InferInsertModel<typeof refreshTokens>;
