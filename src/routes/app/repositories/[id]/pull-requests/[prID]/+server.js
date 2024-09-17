import { fetchPullRequest } from '$lib/utils/api/reviews';

export async function GET({ params, fetch }) {
	const { id, prID } = params;
	return await fetchPullRequest(id, prID, fetch);
}
