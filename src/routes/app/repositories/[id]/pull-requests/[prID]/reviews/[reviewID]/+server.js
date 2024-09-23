import { env } from '$env/dynamic/private';
import { deleteReview, getReview } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id, prID, reviewID } = params;
	const cookies = request.headers.get('cookie');
	return await getReview(id, prID, reviewID, cookies, fetch, env.API_URL);
}

export async function DELETE({ request, params, fetch }) {
	const { id, prID, reviewID } = params;
	const cookies = request.headers.get('cookie');
	return await deleteReview(id, prID, reviewID, cookies, fetch, env.API_URL);
}
