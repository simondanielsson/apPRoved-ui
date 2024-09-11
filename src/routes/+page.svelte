<script>
  import SidePanel from '$lib/components/SidePanel.svelte';
  import MainContent from '$lib/components/MainContent.svelte';
  import { onMount } from 'svelte';

  let repositories = [];
  let selectedRepository = null;
  let pullRequests = [];
  let selectedPullRequest = null;
  let reviews = []
  let selectedReview = null;
  let fileReviews = []


  // Sample data to simulate API response, will be replaced with actual API logic later
  const dummyRepositories = [
    { id: 1, name: 'myapp-api' },
    { id: 2, name: 'myapp-ui' },
  ];

  const dummyPullRequests = {
    1: [{ id: 1, title: 'Fix bug in component' }, { id: 3, title: 'Improvements to latency' }],
    2: [{ id: 2, title: 'Add new feature' }]
  };

  const dummyReviews = {
    1: [
      { id: 1, title: "Automatic review 1", file_reviews: [1, 2] },
      { id: 2, title: "Automatic review 2", file_reviews: [3] }
    ]
  };

  const dummyFileReviews = {
    1: { filename: "src/components/Component1.js", content: "This file looks good, no issues found." },
    2: { filename: "src/components/Component2.js", content: "Found issues in imports." },
    3: { filename: "src/components/Component3.js", content: "Consider refactoring." }
  };

  onMount(() => {
    repositories = dummyRepositories;
  });

  // Handle selections
  function selectRepository(event) {
    console.log('selectRepository received event:', event);
    const repository = event.detail.repository;
    selectedRepository = repository;
    pullRequests = dummyPullRequests[repository.id] || [];

    selectedPullRequest = null;
    reviews = [];
    selectedReview = null;
  }

  function selectPullRequest(event) {
    console.log('selectPullRequest received event:', event);
    const pullRequest = event.detail.pullRequest;
    selectedPullRequest = pullRequest;
    reviews = dummyReviews[pullRequest.id] || [];
    selectedReview = null;
    fileReviews = [];
  }

  function selectReview(event) {
    console.log('selectReview received event:', event);
    const review = event.detail.review;
    selectedReview = review;
    fileReviews = review.file_reviews.map(id => dummyFileReviews[id]);
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
