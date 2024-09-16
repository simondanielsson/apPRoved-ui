import { fetchFileReviews } from '$lib/utils/proxy/reviews';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { id, prID, reviewID } = params;
  return {
    repoID: id,
    prID: prID,
    reviewID: reviewID,
    fileReviews: await fetchFileReviews(id, prID, reviewID, fetch),
  };
}
