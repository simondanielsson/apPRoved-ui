import { env } from '$env/dynamic/private';
import { fetchRepository } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id } = params;
	const cookies = request.headers.get('cookie');
	return await fetchRepository(id, cookies, fetch, env.API_URL);
}
