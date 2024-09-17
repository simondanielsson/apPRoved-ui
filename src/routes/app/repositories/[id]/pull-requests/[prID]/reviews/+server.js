import { fetchReviews, createReview } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id, prID } = params;
	const cookies = request.headers.get('cookie');
	return await fetchReviews(id, prID, cookies, fetch);
}

export async function POST({ request, params, fetch }) {
	const { id, prID } = params;
  const { name } = await request.json()
	const cookies = request.headers.get('cookie');

	return await createReview(id, prID, name, cookies, fetch);
}
