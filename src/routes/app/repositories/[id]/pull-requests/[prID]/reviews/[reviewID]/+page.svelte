<script>
  import List from '@smui/list';
  import FileTreeNode from '$lib/components/FileTreeNode.svelte';
  import { selectedPullRequest } from '$lib/stores/pull-request'
	import { buildFileTree } from '$lib/utils/fileTree.js';
  import FileDiffAndReview from '$lib/components/FileDiffAndReview.svelte'
  
  export let data;
  let repoID = data.repoID;
  let prID = data.prID;
  let fileReviews = data.fileReviews.file_reviews;
  let selectedFileReview;
  $: fileTree = buildFileTree(fileReviews);

  function handleSelectFileReview(event) {
    selectedFileReview = event.detail.fileReview;
  }

  function handleGoBack() {
    selectedFileReview = null;
  }
</script>


<div class="w-full h-full flex">
  <div class='flex flex-col window-h w-full'>
    <!-- Header -->
    <div class='flex flex-row items-center mb-4'>
      <a
        class="bg-primary text-white p-2 rounded-lg flex items-center"
        href={`/app/repositories/${repoID}/pull-requests/${prID}`}
        on:click={handleGoBack}
      >
        <span class="flex flex-row items-center whitespace-nowrap"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Go back
        </span>
      </a>
      <h1 class="text-3xl w-full ml-4 font-bold text-primary">Review for {$selectedPullRequest ? $selectedPullRequest.title : 'loading...'}</h1>
    </div>
    
    <div class='flex h-full w-full'>
      <!-- Left Panel: File Directory -->
      <div class="w-80 min-w-80 bg-gray-100 p-4 overflow-y-auto">
        <h3 class="text-xl font-bold mb-4">Files in Review</h3>
        <List class="space-y-2">
          {#each Object.keys(fileTree) as key}
            <FileTreeNode node={fileTree[key]} selectedFileReview={selectedFileReview} on:selectFileReview={handleSelectFileReview} />
          {/each}
        </List>
      </div>

      <!-- Right Panel: File Content & Comments -->
      <div class="flex-grow p-6 overflow-y-auto">
        <FileDiffAndReview {selectedFileReview} />
      </div>
    </div>
  </div>
</div>
