<script>
  import SidePanel from '$lib/components/SidePanel.svelte';
  import MainContent from '$lib/components/MainContent.svelte';
  import { onMount } from 'svelte';
  import { fetchRepositories, fetchPullRequests, fetchReviews, fetchFileReviews } from '$lib/utils/api/reviews.js';

  let repositories = [];
  let selectedRepository = null;
  let pullRequests = [];
  let selectedPullRequest = null;
  let reviews = []
  let selectedReview = null;
  let fileReviews = []

  onMount(async () => {
    try {
      repositories = await fetchRepositories();
    } catch (error) {
      // TODO: show error notification
      console.error('Error fetching repositories:', error);
    }
  });

  async function selectRepository(event) {
    const repository = event.detail.repository;
    selectedRepository = repository;
    selectedPullRequest = null;
    reviews = [];
    selectedReview = null;

    if (repository) {
      try {
        pullRequests = await fetchPullRequests(repository.id);
      } catch (error) {
        // TODO: show error notification
        console.error('Error fetching pull requests:', error);
        pullRequests = [];
      }
    } else {
      pullRequests = [];
    }
  }

  async function selectPullRequest(event) {
    const pullRequest = event.detail.pullRequest;
    selectedPullRequest = pullRequest;
    selectedReview = null;
    fileReviews = [];

    if (pullRequest && selectedRepository) {
      try {
        reviews = await fetchReviews(selectedRepository.id, pullRequest.id);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        reviews = [];
      }
    } else {
      reviews = [];
    }
  }

  async function selectReview(event) {
    const review = event.detail.review;
    selectedReview = review;
    fileReviews = [];

    if (review && selectedRepository && selectedPullRequest) {
      try {
        const fileReviewsData = await fetchFileReviews(
          selectedRepository.id,
          selectedPullRequest.id,
          review.id,
        );
        fileReviews = fileReviewsData.file_reviews
        console.log(fileReviews)
      } catch (error) {
        console.error('Error fetching file reviews:', error);
        fileReviews = [];
      }
    }
  }
  
</script>

<div class="flex h-screen bg-gray-100">
  <SidePanel {repositories} on:selectRepository={selectRepository} />
  <div class="flex-grow flex justify-center items-center p-8 bg-gray-50">
    <MainContent
        {selectedRepository}
        {pullRequests}
        {selectedPullRequest}
        {reviews}
        {selectedReview}
        {fileReviews}
        on:selectPullRequest={selectPullRequest}
        on:selectReview={selectReview}
      />
  </div>
</div>
