import { sentrySvelteKit } from '@sentry/sveltekit';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			telemetry: false,
			sourceMapsUploadOptions: {
				org: 'relentless-organization',
				project: 'relentless-project'
			}
		}),
		tailwindcss(),
		sveltekit()
	]
});
