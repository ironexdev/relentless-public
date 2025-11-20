import DuplicateValueError from '$lib/errors/duplicate-value-error';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { pgTableCreator } from 'drizzle-orm/pg-core';
import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/database/schema';

// Cache the database connection in development. This avoids creating a new connection on every HMR update.
const globalForDb = globalThis as unknown as {
	conn: Pool | null;
};

const getSSLConfig = () => {
	if (env.DATABASE_SSL === 'true' || env.DATABASE_SSL === 'require') {
		return { rejectUnauthorized: false };
	}
	return false;
};

const conn =
	globalForDb.conn ??
	new Pool({
		host: env.DATABASE_HOST,
		port: Number(env.DATABASE_PORT),
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME,
		ssl: getSSLConfig(),
		max: Number(env.DATABASE_MAX_CONNECTIONS)
	});

if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

// This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same database instance for multiple projects.
export const createTable = pgTableCreator((name) => `rp_${name}`);

export function takeOne<T>(values: T[]): T | null {
	if (values.length === 0) {
		return null; // Return null if no values are found
	}

	if (values.length !== 1) {
		throw new DuplicateValueError(); // Throw error if there are multiple values
	}

	return values[0] ?? null; // Return the single value
}
