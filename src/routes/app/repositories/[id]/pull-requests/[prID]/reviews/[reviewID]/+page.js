import { selectedPullRequest } from '$lib/stores/pull-request';
import { selectedReview } from '$lib/stores/reviews';
import { fetchFileReviews, fetchPullRequest, fetchReview } from '$lib/utils/proxy/reviews';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const { id, prID, reviewID } = params;

	let review = get(selectedReview);
	let pullRequest = get(selectedPullRequest);

	if (!review || Number(review.id) !== Number(reviewID)) {
		review = await fetchReview(id, prID, reviewID, fetch);
		selectedReview.set(review);
	}

	if (!pullRequest || Number(pullRequest.id) !== Number(prID)) {
		pullRequest = await fetchPullRequest(id, prID, fetch);
		selectedPullRequest.set(pullRequest);
	}

	const fileReviews = await fetchFileReviews(id, prID, reviewID, fetch);
	const repoID = id;
	return {
		repoID,
		prID,
		reviewID,
		fileReviews
	};
}
