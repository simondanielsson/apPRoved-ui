import { fetchPullRequests } from '$lib/utils/proxy/reviews';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { id } = params;

  return {
    repoID: id,
    pullRequests: await fetchPullRequests(id, fetch),
  };
}
