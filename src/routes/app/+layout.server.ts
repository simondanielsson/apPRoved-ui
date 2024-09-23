import { fetchRepositories } from '$lib/utils/api/reviews.js';
import { env } from '$env/dynamic/private';

export async function load({ cookies }) {
	return {
		repositories: await fetchRepositories(cookies, env.API_URL)
	};
}
