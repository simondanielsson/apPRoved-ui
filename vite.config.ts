import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

const environment = process.env.APP_ENV;
const envFile = `.env.frontend.${environment}`;
dotenv.config({ path: envFile });
console.log(`Using environment: ${environment}`);

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env': process.env
	}
});
