import { fetchReviews } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id, prID } = params;
	const cookies = request.headers.get('cookie');
	return await fetchReviews(id, prID, cookies, fetch);
}
