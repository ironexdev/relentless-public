import { defineConfig } from 'drizzle-kit';
import { env } from 'process';

if (!env.DATABASE_HOST || !env.DATABASE_PORT || !env.DATABASE_USER || !env.DATABASE_PASSWORD || !env.DATABASE_NAME) {
	throw new Error('DATABASE environment variables are not set');
}

export default defineConfig({
	schema: './src/lib/server/database/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		host: env.DATABASE_HOST,
		port: Number(env.DATABASE_PORT),
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME
	},
	verbose: true,
	strict: true
});