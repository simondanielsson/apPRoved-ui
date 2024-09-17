<script>
	import { createEventDispatcher } from 'svelte';
	export let onClose;
	let url = '';
	let owner = '';
	let name = '';

	const dispatch = createEventDispatcher();

	function createRepository() {
		if (!url || !owner || !name) {
			alert('All fields are required.');
			return;
		}

		dispatch('createRepository', {
			url,
			owner,
			name
		});
		onClose();
		resetForm();
	}

	function resetForm() {
		url = '';
		owner = '';
		name = '';
	}
</script>

<!-- Modal Overlay -->
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
			autocomplete="off"
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
			autocomplete="off"
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
			autocomplete="off"
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
