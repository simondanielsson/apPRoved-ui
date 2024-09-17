import { API_URL } from '../api';

export async function fetchRepositories(cookies) {
	const response = await fetch(`${API_URL}/repositories`, {
		headers: { Authorization: `Bearer ${cookies.get('token')}` }
	});
	if (response.status != 200) {
		throw new Error('Failed to fetch repositories');
	}
	const data = await response.json();
	return data.repositories;
}

export async function registerRepository(request, fetch) {
	const method = request.method;
	return await fetch(`${API_URL}/repositories`, {
		method,
		headers: {
			// forward only necessary headers
			Cookie: request.headers.get('Cookie')
		},
		body: await request.formData()
	});
}

export async function fetchRepository(repositoryId, fetch) {
  return await fetch (
    `${API_URL}/repositories/${repositoryId}`
  )
}

export async function fetchPullRequests(repositoryId, fetch) {
	return await fetch(`${API_URL}/repositories/${repositoryId}/pull-requests`);
}

export async function fetchPullRequest(repositoryId, prID, fetch) {
	return await fetch(`${API_URL}/repositories/${repositoryId}/pull-requests/${prID}`);
}

export async function fetchReviews(repositoryId, pullRequestId, fetch) {
	return await fetch(
		`${API_URL}/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews`
	);
}

export async function getReview(repositoryId, pullRequestId, reviewId, fetch) {
  return await fetch(
    `${API_URL}/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}`
  );
}

export async function fetchFileReviews(repositoryId, pullRequestId, reviewId, fetch) {
	return await fetch(
		`${API_URL}/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}/files`
	);
}

export async function createReview(repoID, prID, request, fetch) {
	const method = request.method;
	const headers = request.headers;
	return await fetch(`${API_URL}/repositories/${repoID}/pull-requests/${prID}/reviews`, {
		method,
		headers,
		body: JSON.stringify(await request.json())
	});
}

export async function getReviewStatus(repoID, prID, reviewID, fetch) {
	return await fetch(
		`${API_URL}/repositories/${repoID}/pull-requests/${prID}/reviews/${reviewID}/progress`
	);
}

export async function deleteReview(repoID, prID, reviewID, fetch) {
	return await fetch(
		`${API_URL}/repositories/${repoID}/pull-requests/${prID}/reviews/${reviewID}`,
		{
			method: 'DELETE'
		}
	);
}
