import { selectedPullRequest } from '$lib/stores/pull-request';
import { fetchPullRequest, fetchReviews } from '$lib/utils/proxy/reviews';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const { id, prID } = params;

	let pullRequest = get(selectedPullRequest);

	if (!pullRequest || Number(pullRequest.id) !== Number(prID)) {
		pullRequest = await fetchPullRequest(id, prID, fetch);
		selectedPullRequest.set(pullRequest);
	}

	const repoID = id;
	const reviews = await fetchReviews(id, prID, fetch);

	return {
		repoID,
		prID,
		reviews
	};
}
