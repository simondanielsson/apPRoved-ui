import { getReviewStatus } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id, prID, reviewID } = params;
	const cookies = request.headers.get('cookie');
	return await getReviewStatus(id, prID, reviewID, cookies, fetch);
}
