<script>
  import { marked } from 'marked';
  import List, { Item } from '@smui/list';

  // Add title to the page from the review
  let selectedReview = null;
  export let fileReviews = [];

  let selectedFileReview = null;

  function handleSelectFileReview(fileReview) {
    selectedFileReview = fileReview;
  }

  function renderMarkdown(content) {
    return marked(content);
  }

  function handleGoBack() {
    selectedFileReview = null;
    dispatch('selectReview', { review: null });
  }
</script>
<div class="w-full h-full flex">
  <!-- Left Panel: File Directory -->
  <div class="w-1/4 bg-gray-100 p-4 overflow-y-auto">
    <h3 class="text-xl font-bold mb-4">Files in Review</h3>
    <List class="space-y-2">
      {#each fileReviews as fileReview}
        <Item
          class="p-3 rounded-lg cursor-pointer bg-white hover:bg-blue-100"
          on:click={() => handleSelectFileReview(fileReview)}
        >
          {fileReview.filename}
        </Item>
      {/each}
    </List>
  </div>

  <!-- Right Panel: File Content & Comments -->
  <div class="w-3/4 p-6 overflow-y-auto">
    {#if selectedFileReview}
      <div>
        <h2 class="text-2xl font-bold mb-4">{selectedFileReview.filename}</h2>
        <pre class="bg-gray-100 p-4 rounded-lg shadow">{renderMarkdown(selectedFileReview.patch)}</pre>
        <h3 class="text-xl font-bold mt-6">Review Comments</h3>
        <div class="prose mt-2" innerHTML={renderMarkdown(selectedFileReview.content)}></div>
      </div>
    {:else}
      <div class="text-gray-700">Select a file from the list to view its content and comments.</div>
    {/if}
  </div>
</div>
