<script>
  import { Item } from '@smui/list';
  import { Icon, Folder, Document } from 'svelte-hero-icons';
  import { createEventDispatcher } from 'svelte';

  // the current node
  export let node;
  // the selected node
  export let selectedFileReview;
  let isCollapsed = false;

  const dispatch = createEventDispatcher();

  function toggleFolder() {
    isCollapsed = !isCollapsed;
  }


  // both functions below are used to handle the selection of a file review since this is recursive
  function handleFileReviewSelected(event) {
    const fileReview = event.detail.fileReview;  
    handleSelectFileReview(fileReview)
  }

  function handleSelectFileReview(fileReview) {
    dispatch('selectFileReview', { "fileReview": fileReview });
  }

  $: isSelected = selectedFileReview === node.fileReview;
</script>

{#if node.type === 'folder'}
  <div>
    <!-- Folder Item -->
    <Item class="cursor-pointer hover:bg-gray-200 rounded-lg flex items-center mb-2" on:click={toggleFolder}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6 transition-transform transform duration-200 {isCollapsed ? '' : 'rotate-90'}"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
      <Icon src="{Folder}" class="h-5 w-5 mr-2" solid />
      {node.name}
    </Item>

    <div class="ml-3 folder-children" class:hidden={isCollapsed}>
      {#each Object.keys(node.children) as key}
        <svelte:self node={node.children[key]} selectedFileReview={selectedFileReview} on:selectFileReview={handleFileReviewSelected} />
      {/each}
    </div>
  </div>
{:else}
  <!-- File -->
  <Item class="pl-2 ml-3 mb-2 cursor-pointer flex items-center hover:bg-gray-200 rounded-lg {isSelected ? 'bg-gray-200' : ''}" on:click={() => handleSelectFileReview(node.fileReview)}>
    <Icon src="{Document}" class="h-5 w-5 mr-2" />
    {node.name}
  </Item>
{/if}

<style>
  .folder-children {
    transition: max-height 0.3s ease-out;
  }
</style>
