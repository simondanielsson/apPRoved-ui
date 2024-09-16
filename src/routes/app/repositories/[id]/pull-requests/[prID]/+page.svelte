<script>
  import { fade } from 'svelte/transition';
  import Button from '@smui/button';
  import List, { Item } from '@smui/list';
  import { Icon, CheckCircle } from "svelte-hero-icons";
  import Time from "svelte-time";
  import ProgressBar from "@okrad/svelte-progressbar";

  import { selectedPullRequest } from '$lib/stores/pull-request';
  import { selectedReview } from '$lib/stores/reviews'
  import { createReview, getReviewStatus, deleteReview } from '$lib/utils/proxy/reviews.js'
  import PopupNotification from '$lib/components/PopupNotification.svelte';
  import EllipsisButton from '$lib/components/EllipsisButton.svelte';
  import Modal from '$lib/components/Modal.svelte';

  export let data;
  let reviews = data.reviews || [];
  let repoID = data.repoID;
  let prID = data.prID;

  let isAddingReview = false;
  let reviewName = '';
  let createMessage = {
    message: '',
    type: ''
  };

  let isModalOpen = false;
  let reviewToDelete = null;
  let deleteMessage = {
    message: '',
    type: ''
  };

  async function handleCreateReview() {
    try {
      const pendingReview = await createReview(repoID, prID, reviewName, fetch)
      reviews = [...reviews, pendingReview];
      
      pollReviewProgress(pendingReview.id);
      resetCreateReview()
      createMessage = {
        message: 'Review created successfully',
        type: 'success'
      }
      setTimeout(() => {
        createMessage = {
          message: '',
          type: ''
        }
      }, 3000);
    } catch (error) {
      // TODO: add notification
      console.error("Failed to create review", error);
    }
  }

  function resetCreateReview() {
    isAddingReview = false;
    reviewName = '';
  }

  function handleGoBack() {
    resetCreateReview();
    selectedPullRequest.set(null);
  }


  function handleSelectReview(review, event) {
    selectedReview.set(review);
  }

  function isPending(review) {
    return review.status !== 'available';
  }

  const progressBarColor = '#65CEA7';
  function progressToSeries(progress) {
    return [{
      perc: progress,
      color: progressBarColor
    }]
  }

  async function pollReviewProgress(reviewId) {
    let intervalId = setInterval(async () => {
      try {
        const reviewStatus = await getReviewStatus(repoID, prID, reviewId, fetch)
        updatePendingReviewProgress(reviewId, reviewStatus.progress);

        if (reviewStatus.progress >= 100) {
          clearInterval(intervalId);
          markReviewAsComplete(reviewId, reviewStatus);
        }
      } catch (error) {
        console.error("Error fetching review progress", error);
        clearInterval(intervalId);
      }
    }, 2000);
  }

  function updatePendingReviewProgress(reviewId, progress) {
    reviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, progress } : review
    );
  }
  function markReviewAsComplete(reviewId, reviewStatus) {
    reviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, status: reviewStatus.status, progress: 100 } : review
    );
  }

  function handleDeleteClick(review, event) {
    event.preventDefault();
    event.stopPropagation();
    reviewToDelete = review;
    isModalOpen = true;
  }
  
  function cancelDeleteReview() {
    reviewToDelete = null;
    isModalOpen = false;
  }

  async function confirmDeleteReview() {
    const reviewID = reviewToDelete.id;
    reviews = reviews.filter((r) => r.id !== reviewID);
    isModalOpen = false;
    reviewToDelete = null;

    const response = await deleteReview(repoID, prID, reviewID, fetch);
    deleteMessage = {
      message: response.message,
      type: response.type,
    }
    setTimeout(() => {
      deleteMessage = {
        message: '',
        type: ''
      }
    }, 3000);
  }

</script>

<div>
  <div class="flex items-center">
    <a 
      class="mr-4 mb-6" 
      href={`/app/repositories/${repoID}`}
      on:click={handleGoBack}
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </a>
    <h2 class="text-2xl font-bold mb-6 text-primary">Reviews for {$selectedPullRequest ? `${$selectedPullRequest.title} #${$selectedPullRequest.number}` : 'Loading...'}</h2>
  </div>

  <List class="space-y-4">
    {#if reviews}
      {#each reviews as review}
        <div
          class="flex flex-col items-center items-center p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100 bg-white"
          >
          
          <div class="flex flex-row items-center">
            <a
              href={`/app/repositories/${repoID}/pull-requests/${prID}/reviews/${review.id}`}
              on:click={(event) => handleSelectReview(review, event)}
            >
              <h3 class="text-lg {isPending(review) ? 'text-gray-500' : ''} font-semibold">{review.title}</h3>
              <span class="{isPending(review) ? 'text-gray-500' : 'text-gray-700'}">Created at <Time timestamp={review.created_at} format="dddd @ h:mm A · MMMM D, YYYY"/>
            </a>
            {#if !isPending(review)}
              <div class="ml-2 flex flex-row">
                <Icon src={CheckCircle} class="h-8 w-8 text-green-500" solid />
                <EllipsisButton on:delete={(event) => handleDeleteClick(review, event)} /> 
              </div>
            {/if}
          </div>
          {#if isPending(review)}
            <div class="w-full mt-2">
              <ProgressBar series={progressToSeries(review.progress)} showProgressValue={false} ry="1.5" rx="1.5" cls="rounded rounded-lg"/>
            </div>
          {/if}
        </div>
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
          placeholder="My first review"
        />
        <div class="mt-4 flex justify-end space-x-2">
          <Button class="bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-primary-dark" on:click={handleCreateReview}>Submit</Button>
          <Button class="bg-gray-300 text-black p-2 rounded-lg shadow-md hover:bg-gray-400" on:click={resetCreateReview}>Cancel</Button>
        </div>
      </div>
    {/if}
  </List>

  {#if deleteMessage.message}
    <PopupNotification type={deleteMessage.type}> 
      {deleteMessage.message}
    </PopupNotification>
  {/if}

  {#if createMessage.message}
    <PopupNotification type={createMessage.type}> 
      {createMessage.message}
    </PopupNotification>
  {/if}
</div>


<Modal 
  isOpen={isModalOpen}
  on:confirm={confirmDeleteReview}
  on:cancel={cancelDeleteReview}
>
  <h2 class="text-xl font-semibold mb-4">Delete {reviewToDelete ? reviewToDelete.title : ''}</h2>
  <p class="mb-6">Are you sure?</p>
</Modal>
