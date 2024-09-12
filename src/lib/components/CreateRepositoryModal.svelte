<script>
  export let show = false;
  export let onClose;
  let url = '';
  let owner = '';
  let name = '';

  function createRepository() {
    // TODO
    console.log('Repository Created:', { url, owner, name });
    onClose();
    resetForm();
  }

  function resetForm() {
    url = '';
    owner = '';
    name = '';
  }
</script>

{#if show}
  <!-- Modal Overlay -->
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Add New Repository</h2>

      <form on:submit|preventDefault={createRepository}>
        <!-- GitHub URL Field -->
        <div class="mb-4">
          <label for="url" class="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input
            id="url"
            type="url"
            placeholder="https://github.com/user/repo"
            bind:value={url}
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
          <p class="mt-1 text-sm text-gray-500">Enter the full URL of the GitHub repository.</p>
        </div>

        <!-- Owner Field -->
        <div class="mb-4">
          <label for="owner" class="block text-sm font-medium text-gray-700">Repository Owner</label>
          <input
            id="owner"
            type="text"
            placeholder="Owner Name"
            bind:value={owner}
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <!-- Repository Name Field -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Repository Name</label>
          <input
            id="name"
            type="text"
            placeholder="Repository Name"
            bind:value={name}
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex justify-between">
          <button type="button" class="bg-gray-300 text-black p-2 rounded-lg" on:click={onClose}>
            Cancel
          </button>
          <button type="submit" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Create Repository
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
