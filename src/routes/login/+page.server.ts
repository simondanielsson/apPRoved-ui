import { loginUser } from '$lib/utils/api';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username || !password) {
            return fail(400, { error: 'Missing username or password' });
        }

        const { token } = await loginUser(formData);

        cookies.set('token', token, {
            httpOnly: true,  // Prevent client-side access to the token
            secure: false,    // Only send the cookie over HTTPS
            path: '/',       // Cookie is available on all routescookies
            sameSite: 'lax', // Prevent CSRF attacks
            maxAge: 60 * 60 * 1 // 1 hour
        });
        throw redirect(302, '/app');
    }
};
