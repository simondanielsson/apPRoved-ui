import { verifyToken } from '$lib/utils/token';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Performed during the server-side routing phase, initially when pages loads.
// Here we can prevent access to certain routes if the user is not authenticated.
export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	const nonProtectedRoutes = ['/login', '/signup'];

	if (event.url.pathname === '/') {
		throw redirect(302, '/app');
	}

	// accessing protected routes without a token will redirect to /login
	if (!nonProtectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!token) {
			throw redirect(302, '/login');
		}

		try {
			const user = verifyToken(token, env.JWT_SECRET);
			if (user) {
				event.locals.user = user;
			}
			event.locals.token = token;
		} catch (err) {
			throw redirect(302, '/login');
		}
	}

	return await resolve(event);
};
