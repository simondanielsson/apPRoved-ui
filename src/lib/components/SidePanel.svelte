<script>
  import { createEventDispatcher } from 'svelte';

  export let repositories = [];
  let showRepositories = false;
  let isSidebarExpanded = true;
  
  const dispatch = createEventDispatcher();

  function toggleRepositories() {
    showRepositories = !showRepositories;
  }
    
  function toggleSidebarSize() {
    isSidebarExpanded = !isSidebarExpanded;
  }

  function selectRepository(repo) {
    console.log('Selected repository:', repo);
    dispatch('selectRepository', {"repository": repo});
  }
</script>


<div class="h-full shadow-lg flex flex-col">
  <!-- Sidebar -->
  <div class="bg-primary text-white p-6 h-full flex flex-col transition-all duration-300" class:w-64={isSidebarExpanded} class:w-20={!isSidebarExpanded}>
    
    {#if isSidebarExpanded}
      <div class="flex items-center mb-8">
        <img src="/favicon-32x32.png" alt="Logo" class="h-8 w-8 mr-3" />
        <span class="text-2xl font-bold">apPRoved</span>
        <!-- Resizing Button (arrow icon) at the top -->
        <button class="text-white p-2" on:click={toggleSidebarSize}>
          <span class="ant-btn-icon">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="0"
              class="w-6 h-6 transition-transform transform duration-200" 
              class:rotate-180={!isSidebarExpanded}>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
            </svg>
          <span>
        </button>
      </div>

      <div class="mb-4">
        <button class="flex items-center text-lg font-bold cursor-pointer bg-transparent border-none w-full text-left hover:text-gray-300 transition-all" on:click={toggleRepositories} type="button">
          Repositories
          <svg 
            class="ml-2 h-4 w-4 transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            class:rotate-180={showRepositories}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {#if showRepositories}
          <ul class="mt-4 space-y-2">
            {#each repositories as repository}
              <li>
                <button class="bg-primary hover:bg-primary-dark p-2 rounded w-full text-left text-white border border-primary focus:outline-none focus:ring-white" on:click={() => selectRepository(repository)}>
                  {repository.name}
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {:else}
        <div class="flex items-center mb-8">
          <button class="text-white p-2" on:click={toggleSidebarSize}>
            <span class="ant-btn-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="0"
                class="w-6 h-6 transition-transform transform duration-200" 
                class:rotate-180={!isSidebarExpanded}>
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            <span>
          </button>
        </div>
    {/if}
  </div>
</div>

<style>
  .ant-btn-icon {
      line-height: 1;
  }
</style>
