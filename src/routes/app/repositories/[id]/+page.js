import { fetchRepository, fetchPullRequests } from '$lib/utils/proxy/reviews';
import { selectedRepository } from '$lib/stores/repository';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const { id } = params;

	let repository = get(selectedRepository);

	if (!repository || Number(repository.id) !== Number(id)) {
		repository = await fetchRepository(id, fetch);
		selectedRepository.set(repository);
	}

	const pullRequests = await fetchPullRequests(id, fetch);
	const repoID = id;

	return {
		repoID,
		repository,
		pullRequests
	};
}
