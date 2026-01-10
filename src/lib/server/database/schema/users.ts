import { type InferInsertModel, sql } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm/table';
import crypto from 'crypto';

export const users = pgTable('users', {
	id: varchar('id', { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: timestamp('email_verified', {
		mode: 'date',
		precision: 3
	}).default(sql`CURRENT_TIMESTAMP(3)`),
	username: varchar('username', { length: 255 }).unique(),
	picture: varchar('picture', { length: 2000 }),
	photo: varchar('photo', { length: 2000 }),
	yearOfBirth: integer('year_of_birth'),
	profileLink: varchar('profile_link', { length: 255 }).unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
});

export type SelectUserType = InferSelectModel<typeof users>;
export type InsertUserType = InferInsertModel<typeof users>;
