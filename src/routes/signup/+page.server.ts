import { registerUser } from '$lib/utils/api';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request }) => {
    throw redirect(302, '/login');
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');

		if (!username || !password || !email) {
			return fail(400, { error: 'Missing username, password or email' });
		}

		const userID = await registerUser(formData, env.API_URL);
		throw redirect(302, '/login?success=1');
	}
};
