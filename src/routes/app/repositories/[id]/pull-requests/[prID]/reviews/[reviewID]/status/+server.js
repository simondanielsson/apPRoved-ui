import { getReviewStatus } from '$lib/utils/api/reviews';

export async function GET({ params, fetch }) {
	const { id, prID, reviewID } = params;
	return await getReviewStatus(id, prID, reviewID, fetch);
}
