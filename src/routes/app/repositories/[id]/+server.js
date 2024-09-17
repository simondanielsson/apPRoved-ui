import { fetchRepository } from '$lib/utils/api/reviews';

export async function GET({ params, fetch }) {
  const { id } = params;
  return await fetchRepository(id, fetch);
}
