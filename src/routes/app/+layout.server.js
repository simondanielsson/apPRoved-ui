import { fetchRepositories } from '$lib/utils/api/reviews.js';

export async function load({ cookies }) {
	return {
		repositories: await fetchRepositories(cookies)
	};
}
