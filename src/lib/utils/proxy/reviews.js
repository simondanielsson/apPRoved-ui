export async function registerRepository(repoInfo, fetch) {
	const formData = new FormData();
	formData.append('url', repoInfo.url);
	formData.append('owner', repoInfo.owner);
	formData.append('name', repoInfo.name);

	const response = await fetch('/app/repositories', {
		method: 'POST',
		body: formData
	});
	if (!response.ok) {
		throw new Error('Failed to register repository');
	}
	const repository = await response.json();
	return repository.data;
}

export async function fetchRepository(repoID, fetch) {
	const response = await fetch(`/app/repositories/${repoID}`);
	if (!response.ok) {
		throw new Error('Failed to fetch repository');
	}
	const repository = await response.json();
	return repository.data;
}

export async function getReviewStatus(repoID, prID, reviewID, fetch) {
	const response = await fetch(
		`/app/repositories/${repoID}/pull-requests/${prID}/reviews/${reviewID}/status`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch review progress');
	}
	const data = await response.json();
	const reviewStatus = data.data;
	return reviewStatus;
}

export async function createReview(repoID, prID, reviewName, fetch) {
	const response = await fetch(`/app/repositories/${repoID}/pull-requests/${prID}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name: reviewName })
	});
	if (!response.ok) {
		throw new Error('Failed to fetch product');
	}
	const data = await response.json();
	const pendingReview = data.data;
	return pendingReview;
}

export async function fetchPullRequests(repositoryId, fetch) {
	const response = await fetch(`/app/repositories/${repositoryId}/pull-requests`);
	if (response.status != 200) {
		throw new Error('Failed to fetch pull requests');
	}

	const pullRequests = await response.json();
	return pullRequests.data;
}

export async function fetchPullRequest(repositoryId, pullRequestId, fetch) {
	const response = await fetch(`/app/repositories/${repositoryId}/pull-requests/${pullRequestId}`);
	if (response.status != 200) {
		throw new Error('Failed to fetch pull request');
	}
	const pullRequest = await response.json();
	return pullRequest.data;
}

export async function updatePullRequests(repositoryId, fetch) {
  const response = await fetch(`/app/repositories/${repositoryId}/pull-requests`, {
    method: 'PUT'
  });
  if (response.status != 200) {
    throw new Error('Failed to update pull requests');
  }
}

export async function fetchReviews(repositoryId, pullRequestId, fetch) {
	const response = await fetch(
		`/app/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews`
	);
	if (response.status != 200) {
		throw new Error('Failed to fetch reviews');
	}
	const reviews = await response.json();
	return reviews.data;
}

export async function fetchReview(repositoryId, pullRequestId, reviewId, fetch) {
	const response = await fetch(
		`/app/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}`
	);
	if (response.status != 200) {
		throw new Error('Failed to fetch review');
	}
	const review = await response.json();
	return review.data;
}

export async function fetchFileReviews(repositoryId, pullRequestId, reviewId, fetch) {
	const response = await fetch(
		`/app/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}/files`
	);
	if (response.status != 200) {
		throw new Error('Failed to fetch file reviews');
	}

	const fileReviews = await response.json();
	return fileReviews.data;
}

export async function deleteReview(repoID, prID, reviewID, fetch) {
	const response = await fetch(
		`/app/repositories/${repoID}/pull-requests/${prID}/reviews/${reviewID}`,
		{
			method: 'DELETE'
		}
	);
	if (response.status != 200) {
		return {
			message: 'Failed to delete review. Please try again later.',
			type: 'error'
		};
	}
	const data = await response.json();
	return {
		message: data.message,
		type: 'success'
	};
}
