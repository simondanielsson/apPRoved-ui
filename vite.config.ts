import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.frontend' });

export default defineConfig({
	plugins: [sveltekit()],
  define: {
    'process.env': process.env
  }
});
