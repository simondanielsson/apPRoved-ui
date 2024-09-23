import { env } from '$env/dynamic/private';
import { fetchPullRequests, refreshPullRequests } from '$lib/utils/api/reviews';

export async function GET({ request, params, fetch }) {
	const { id } = params;
	const cookies = request.headers.get('cookie');
	return await fetchPullRequests(id, cookies, fetch, env.API_URL);
}

export async function PUT({ request, params, fetch }) {
  const { id } = params;
  const cookies = request.headers.get('cookie');
  return await refreshPullRequests(id, cookies, fetch, env.API_URL);
}
