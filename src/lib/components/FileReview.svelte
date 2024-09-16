<script>
  import List from '@smui/list';
  import FileTreeNode from './FileTreeNode.svelte';
  import { createEventDispatcher } from 'svelte';
  import { renderMarkdown } from '$lib/utils/markdown.js';
  import { renderDiff } from '$lib/utils/diff.js';
  import { buildFileTree } from '$lib/utils/fileTree.js';
  import 'highlight.js/styles/monokai-sublime.css';

  // TODO: Add title to the page from the review
  export let fileReviews = [];
  let selectedReview = null;
  let fileTree = {};
  let selectedFileReview = null;

  const dispatch = createEventDispatcher();

  $: fileTree = buildFileTree(fileReviews);

  function handleSelectFileReview(event) {
    selectedFileReview = event.detail.fileReview;
  }

  function handleGoBack() {
    selectedFileReview = null;
    dispatch('selectReview', { review: null });
  }
</script>

<div class="w-full h-full flex">
  <!-- Left Panel: File Directory -->
  <div class="w-1/4 bg-gray-100 p-4">
    <h3 class="text-xl font-bold mb-4">Files in Review</h3>
    <List class="space-y-2">
      {#each Object.keys(fileTree) as key}
        <FileTreeNode node={fileTree[key]} selectedFileReview={selectedFileReview} on:selectFileReview={handleSelectFileReview} />
      {/each}
    </List>
  </div>

  <!-- Right Panel: File Content & Comments -->
  <div class="w-3/4 p-6">
    {#if selectedFileReview}
      <div>
        <div class="top-0 bg-blue-100 shadow-md z-10 py-4 px-6 border-b">
          <h2 class="text-2xl font-bold mb-4">{selectedFileReview.filename}</h2>
        </div>

        <div class="diff-container">
          {@html renderDiff(selectedFileReview.filename, selectedFileReview.patch)}
        </div>

        <div class="border border-gray-200 mt-2 rounded-lg w-full">
          <div class="p-4 bg-gray-50 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mt-6">Review Comments</h3>
          </div>
          <div class="p-4 prose max-w-none w-full">
            {@html renderMarkdown(selectedFileReview.content)}
          </div>
        </div>
      </div>
    {:else}
      <div class="text-gray-700">Select a file from the list to view its content and comments.</div>
    {/if}
  </div>
</div>

<style>
  .diff-container {
    background-color: #f6f8fa;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    position: sticky;
    overflow-y: auto
  }

  /* Style the collapsible folders */
  .folder-children {
    display: block;
  }
  .folder-children.collapsed {
    display: none;
  }
</style>
