<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { registerRepository } from '$lib/utils/proxy/reviews';

  export let data;
  $: repositories = data.repositories || [];

  async function handleCreateRepository(event) {
    const repoInfo = event.detail;
    const repository = await registerRepository(repoInfo, fetch)
    repositories = [...repositories, repository];
    console.log('Created new repository', repository);
    console.log('Now repositories are', repositories);
  }
</script>


<div class="layout flex h-screen bg-gray-100">
  <aside>
    <Sidebar {repositories} on:createRepository={handleCreateRepository} />
  </aside>
  
  <main class="flex-grow flex justify-center items-center p-8 bg-gray-50">
    <slot />
  </main>
</div>

<style>
  aside {
    transition: width 0.3s;
  }
</style>

