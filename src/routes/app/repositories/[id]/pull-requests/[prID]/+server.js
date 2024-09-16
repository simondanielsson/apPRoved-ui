import { fetchReviews } from "$lib/utils/api/reviews"

export async function GET( { params, fetch } ) {
  const { id, prID } = params
  return await fetchReviews(id, prID, fetch)
}
