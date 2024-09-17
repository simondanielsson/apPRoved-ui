import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

const environment = process.env.APP_ENV || 'production';
const envFile = `.env.frontend.${environment}`;
dotenv.config({ path: envFile });

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env': process.env
	}
});
