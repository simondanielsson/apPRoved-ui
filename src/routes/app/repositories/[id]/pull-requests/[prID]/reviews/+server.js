import { createReview } from '$lib/utils/api/reviews';

export async function POST({ params, request, fetch }) {
	const { id, prID } = params;
	return await createReview(id, prID, request, fetch);
}
