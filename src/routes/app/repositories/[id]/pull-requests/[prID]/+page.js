import { fetchReviews } from '$lib/utils/proxy/reviews';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { id, prID } = params;

  return {
    repoID: id,
    prID: prID,
    reviews: await fetchReviews(id, prID, fetch),
  };
}
