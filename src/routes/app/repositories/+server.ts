import { env } from '$env/dynamic/private';
import { registerRepository } from '$lib/utils/api/reviews';

export async function POST({ request, fetch }) {
	return await registerRepository(request, fetch, env.API_URL);
}
