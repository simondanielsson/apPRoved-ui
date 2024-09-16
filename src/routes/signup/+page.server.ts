import { registerUser } from '$lib/utils/api';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');

        if (!username || !password || !email) {
            return fail(400, { error: 'Missing username, password or email' });
        }

        const userID = await registerUser(formData);
        // TODO: add popup for successful registration
        throw redirect(302, '/login?success=1');
    }
};
