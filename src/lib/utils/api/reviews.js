export async function fetchRepositories(cookies, API_URL) {
	const response = await fetch(`${API_URL}/repositories`, {
		headers: { Authorization: `Bearer ${cookies.get('token')}` }
	});
	if (response.status != 200) {
		throw new Error('Failed to fetch repositories');
	}
	const data = await response.json();
	return data.repositories;
}

export async function registerRepository(request, fetch, API_URL) {
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

export async function fetchRepository(repositoryId, cookies, fetch, API_URL) {
	return await fetch(`${API_URL}/repositories/${repositoryId}`, {
		headers: {
			Cookie: cookies
		}
	});
}

export async function fetchPullRequests(repositoryId, cookies, fetch, API_URL) {
	return await fetch(`${API_URL}/repositories/${repositoryId}/pull-requests`, {
		headers: {
			Cookie: cookies
		}
	});
}

export async function fetchPullRequest(repositoryId, prID, cookies, fetch, API_URL) {
	return await fetch(`${API_URL}/repositories/${repositoryId}/pull-requests/${prID}`, {
		headers: {
			Cookie: cookies
		}
	});
}

export async function fetchReviews(repositoryId, pullRequestId, cookies, fetch, API_URL) {
	return await fetch(
		`${API_URL}/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews`,
		{
			headers: {
				Cookie: cookies
			}
		}
	);
}

export async function getReview(repositoryId, pullRequestId, reviewId, cookies, fetch, API_URL) {
	return await fetch(
		`${API_URL}/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}`,
		{
			headers: {
				Cookie: cookies
			}
		}
	);
}

export async function fetchFileReviews(repositoryId, pullRequestId, reviewId, cookies, fetch, API_URL) {
	return await fetch(
		`${API_URL}/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}/files`,
		{
			headers: {
				Cookie: cookies
			}
		}
	);
}

export async function createReview(repoID, prID, name, cookies, fetch, API_URL) {
	return await fetch(`${API_URL}/repositories/${repoID}/pull-requests/${prID}/reviews`, {
    method: 'POST',
		headers: {
			'cookie': cookies,
      'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});
}

export async function getReviewStatus(repoID, prID, reviewID, cookies, fetch, API_URL) {
	return await fetch(
		`${API_URL}/repositories/${repoID}/pull-requests/${prID}/reviews/${reviewID}/progress`,
		{
			headers: {
				Cookie: cookies
			}
		}
	);
}

export async function deleteReview(repoID, prID, reviewID, cookies, fetch, API_URL) {
	return await fetch(
		`${API_URL}/repositories/${repoID}/pull-requests/${prID}/reviews/${reviewID}`,
		{
			method: 'DELETE',
			headers: {
				Cookie: cookies
			}
		}
	);
}
