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
    {/if}

    <!-- Resizing Button (arrow icon) at the bottom -->
    <div class="mt-auto">
      <div class="flex justify-end mb-4">
        <button class="text-white p-2" on:click={toggleSidebarSize}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            class="w-6 h-6 transition-transform transform duration-200" 
            class:rotate-180={!isSidebarExpanded}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
