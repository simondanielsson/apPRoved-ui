import { deleteReview, getReview } from '$lib/utils/api/reviews';

export async function GET({ params, fetch }) {
  const { id, prID, reviewID } = params;
  return await getReview(id, prID, reviewID, fetch);
}

export async function DELETE({ params, fetch }) {
	const { id, prID, reviewID } = params;
	return await deleteReview(id, prID, reviewID, fetch);
}
