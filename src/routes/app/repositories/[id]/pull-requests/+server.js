import { fetchPullRequests } from '$lib/utils/api/reviews';

export async function GET({ params, fetch }) {
	const { id } = params;
	return await fetchPullRequests(id, fetch);
}
