import { fetchPullRequest } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id, prID } = params;
	const cookies = request.headers.get('cookie');
	return await fetchPullRequest(id, prID, cookies, fetch);
}
