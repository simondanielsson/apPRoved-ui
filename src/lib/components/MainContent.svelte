<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Button, { Label } from '@smui/button';
  import List, { Item, Text } from '@smui/list';
  import IconButton from '@smui/icon-button';
  import { marked } from 'marked';

  import FileReview from './FileReview.svelte';

  export let selectedRepository = null;
  export let pullRequests = [];
  export let selectedPullRequest = null;
  export let reviews = [];
  export let selectedReview = null;
  export let fileReviews = [];

  let isAddingReview = false;
  let reviewName = '';

  const dispatch = createEventDispatcher();

  function renderMarkdown(content) {
    return marked(content);
  }

  function handleSelectPullRequest(pr) {
    dispatch('selectPullRequest', { pullRequest: pr });
  }

  function handleSelectReview(review) {
    dispatch('selectReview', { review });
  }

  function handleRefreshPullRequests() {
    // refresh pull requests by dispatching
  }

  function handleCreateReview(name) {
    // open modal to create review
    resetCreateReview()
  }

  function resetCreateReview() {
    isAddingReview = false;
    reviewName = '';
  }

  function handleGoBack() {
    resetCreateReview();
    if (selectedReview) {
      dispatch('selectReview', { review: null });
    } else if (selectedPullRequest) {
      dispatch('selectPullRequest', { pullRequest: null });
    }
  }
</script>

<div class="w-full h-full flex flex-col justify-center items-center p-4">
  {#if !selectedRepository}
    <div class="text-center mt-20">
      <h1 class="text-3xl font-bold text-primary">Welcome to apPRoved - AI-assisted PR review</h1>
      <p class="mt-4 text-lg text-gray-700">Select a repository from the panel to get started.</p>
    </div>

  {:else if !selectedPullRequest}
    <div>
      <h2 class="text-2xl font-bold mb-6 text-primary">Pull Requests for {selectedRepository.name}</h2>
      <List class="space-y-4">
        {#if pullRequests.length > 0}
          {#each pullRequests as pr}
            <Item class="bg-white p-4 rounded-lg shadow-lg hover:bg-blue-100 cursor-pointer" tabindex="0" on:click={() => handleSelectPullRequest(pr)}>
              <h3 class="text-lg font-semibold">{pr.title}</h3>
            </Item>
          {/each}
        {:else}
          <p class="text-gray-700">No open pull requests found.</p>
        {/if}

        <div class="mt-8 p-4 flex justify-center">
          <Button class="flex items-center text-primary hover:text-primary-dark" on:click={handleRefreshPullRequests}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span class="flex items-center ml-2">Refresh</span>
          </Button>
        </div>
      </List>
    </div>
    
  {:else if !selectedReview}
    <div>
      <div class="flex items-center">
        <IconButton class="mr-4 mb-6" on:click={handleGoBack}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </IconButton>
        <h2 class="text-2xl font-bold mb-6 text-primary">Reviews for {selectedPullRequest.title}</h2>
      </div>
      <List class="space-y-4">
        {#if reviews.length > 0}
          {#each reviews as review}
            <Item class="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100" tabindex="0" on:click={() => handleSelectReview(review)}>
              <h3 class="text-lg font-semibold">{review.title}</h3>
            </Item>
          {/each}
        {:else}
          <p class="text-gray-700">No reviews found.</p>
        {/if}

        <Item class="mt-6 w-full bg-primary text-white p-4 rounded-lg shadow-lg hover:bg-primary-dark flex items-center justify-center space-x-2 cursor-pointer"
          tabindex="0"
          on:click={() => isAddingReview = true}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Review</span>
        </Item>

        {#if isAddingReview}
          <div class="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm" transition:fade={{ duration: 150 }}>
            <label for="reviewName" class="block text-sm font-medium text-gray-700">Review Name</label>
            <input
              id="reviewName"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              bind:value={reviewName}
              placeholder="Enter review name"
            />
            <div class="mt-4 flex justify-end space-x-2">
              <Button class="bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-primary-dark" on:click={handleCreateReview}>Submit</Button>
              <Button class="bg-gray-300 text-black p-2 rounded-lg shadow-md hover:bg-gray-400" on:click={() => isAddingReview = false}>Cancel</Button>
            </div>
          </div>
        {/if}
      </List>
    </div>

  {:else}
    <FileReview {fileReviews} />
    <!-- <div> -->
    <!--   <div class="flex items-center"> -->
    <!--     <IconButton class="mr-4 mb-6" on:click={handleGoBack}> -->
    <!--       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> -->
    <!--         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /> -->
    <!--       </svg> -->
    <!--     </IconButton> -->
    <!--     <h2 class="text-2xl font-bold mb-6 text-primary">File Reviews for {selectedReview.title}</h2> -->
    <!--   </div> -->
    <!--   <List class="space-y-4"> -->
    <!--     {#if fileReviews.length > 0} -->
    <!--       {#each fileReviews as fileReview} -->
    <!--         <Item class="bg-white p-4 rounded-lg shadow-lg"> -->
    <!--           <h3 class="text-lg font-semibold">{fileReview.filename}</h3> -->
    <!--           <div class="prose mt-2 text-gray-700" innerHTML={renderMarkdown(fileReview.content)}></div> -->
    <!--         </Item> -->
    <!--       {/each} -->
    <!--     {:else} -->
    <!--       <p class="text-gray-700">No file reviews available.</p> -->
    <!--     {/if} -->
    <!--   </List> -->
    <!-- </div> -->
  {/if}
</div>
