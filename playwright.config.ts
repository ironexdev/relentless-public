import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: {
		baseURL: `http://localhost:${process.env.PORT}`
	},

	testDir: 'e2e'
});