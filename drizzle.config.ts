import { defineConfig } from 'drizzle-kit';
import { env } from 'process';

if (!env.DATABASE_HOST || !env.DATABASE_PORT || !env.DATABASE_USER || !env.DATABASE_PASSWORD || !env.DATABASE_NAME) {
	throw new Error('DATABASE environment variables are not set');
}

const getSSLConfig = () => {
	if (env.DATABASE_SSL === 'true' || env.DATABASE_SSL === 'require') {
		return { rejectUnauthorized: false };
	}
	return false;
};

export default defineConfig({
	schema: './src/lib/server/database/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		host: env.DATABASE_HOST,
		port: Number(env.DATABASE_PORT),
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME,
		ssl: getSSLConfig(),
		max: env.DATABASE_MAX_CONNECTIONS
	},
	verbose: true,
	strict: true
});