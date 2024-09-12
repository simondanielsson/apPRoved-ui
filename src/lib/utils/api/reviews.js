import api from '../api.js';

export async function fetchRepositories() {
  const response = await api.get('/repositories');
  if (response.status != 200) {
    throw new Error('Failed to fetch repositories');
  }
  return await response.data.repositories;
}

export async function fetchPullRequests(repositoryId) {
  const response = await api.get(`/repositories/${repositoryId}/pull-requests`);
  if (response.status != 200) {
    throw new Error('Failed to fetch repositories');
  }
  return await response.data.data;
}

export async function fetchReviews(repositoryId, pullRequestId) {
  const response = await api.get(`/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews`);
  if (response.status != 200) {
    throw new Error('Failed to fetch repositories');
  }
  return await response.data.data;
}

export async function fetchFileReviews(repositoryId, pullRequestId, reviewId) {
  const response = await api.get(`/repositories/${repositoryId}/pull-requests/${pullRequestId}/reviews/${reviewId}`);
  if (response.status != 200) {
    throw new Error('Failed to fetch repositories');
  }
  return await response.data.data;
}
