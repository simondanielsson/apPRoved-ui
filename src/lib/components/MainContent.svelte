<script>
  import { createEventDispatcher } from 'svelte';

  export let selectedRepository = null;
  export let pullRequests = [];
  export let selectedPullRequest = null;
  export let reviews = [];
  export let selectedReview = null;
  export let fileReviews = [];
  
  const dispatch = createEventDispatcher();

  function handleSelectPullRequest(pr) {
    dispatch('selectPullRequest', { pullRequest: pr });
  }

  function handleSelectReview(review) {
    dispatch('selectReview', { review });
  }
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
  {#if !selectedRepository}
    <div class="text-center mt-20">
      <h1 class="text-3xl font-bold text-primary">Welcome to apPRoved - AI-assisted PR review</h1>
      <p class="mt-4 text-lg text-gray-700">Select a repository from the panel to get started.</p>
    </div>

  {:else if !selectedPullRequest}
    <div>
      <h2 class="text-2xl font-bold mb-6 text-primary">Pull Requests for {selectedRepository.name}</h2>
      <ul class="space-y-4">
        {#if pullRequests.length > 0}
          {#each pullRequests as pr}
            <!-- Change the li to a button for better accessibility -->
            <li class="bg-white p-4 rounded-lg shadow-lg">
              <button
                class="w-full text-left cursor-pointer focus:outline-none"
                on:click={() => handleSelectPullRequest(pr)}>
                <h3 class="text-lg font-semibold">{pr.title}</h3>
              </button>
            </li>
          {/each}
        {:else}
          <p class="text-gray-700">No open pull requests found.</p>
        {/if}
      </ul>
    </div>
  {:else if !selectedReview}
    <div>
      <h2 class="text-2xl font-bold mb-6 text-primary">Reviews for {selectedPullRequest.title}</h2>
      <ul class="space-y-4">
        {#if reviews.length > 0}
          {#each reviews as review}
            <li class="bg-white p-4 rounded-lg shadow-lg">
              <button
                class="w-full text-left cursor-pointer focus:outline-none"
                on:click={() => handleSelectReview(review)}>
                <h3 class="text-lg font-semibold">{review.title}</h3>
              </button>
            </li>
          {/each}
        {:else}
          <p class="text-gray-700">No reviews found.</p>
        {/if}
      </ul>
    </div>
  {:else}
    <div>
      <h2 class="text-2xl font-bold mb-6 text-primary">File Reviews for {selectedReview.title}</h2>
      <ul class="space-y-4">
        {#if fileReviews.length > 0}
          {#each fileReviews as fileReview}
            <li class="bg-white p-4 rounded-lg shadow-lg">
              <h3 class="text-lg font-semibold">{fileReview.filename}</h3>
              <p class="mt-2 text-gray-700">{fileReview.content}</p>
            </li>
          {/each}
        {:else}
          <p class="text-gray-700">No file reviews available.</p>
        {/if}
      </ul>
    </div>
  {/if}
</div>
