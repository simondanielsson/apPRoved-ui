<script>
	import Button from '@smui/button';
	import List, { Item } from '@smui/list';
	import { selectedPullRequest } from '$lib/stores/pull-request';
	import Time from 'svelte-time';

	/** @type {import('./$types').PageData} */
	export let data;
	$: repoID = data.repoID;
  $: repository = data.repository;
	$: pullRequests = data.pullRequests || [];

	function handleSelectPullRequest(pr) {
		selectedPullRequest.set(pr);
	}

	async function handleRefreshPullRequests() {
		// TODO: refresh pull requests
	}
</script>

<div>
	<h2 class="text-2xl font-bold mb-6 text-primary">
		Pull Requests for {repository ? repository.name : 'Loading...'}
	</h2>
	<List class="space-y-4">
		{#if pullRequests}
			{#each pullRequests as pr}
				<a
					href={`/app/repositories/${repoID}/pull-requests/${pr.id}`}
					on:click={() => handleSelectPullRequest(pr)}
				>
					<Item class="bg-white p-4 rounded-lg shadow-lg hover:bg-blue-100 cursor-pointer">
						<h3 class="text-lg font-semibold">{pr.title} #{pr.number}</h3>
						<span class="text-gray-700"
							>Updated at <Time timestamp={pr.updated_at} format="dddd @ h:mm A · MMMM D, YYYY" />
						</span></Item
					>
				</a>
			{/each}
		{:else}
			<p class="text-gray-700">No open pull requests found.</p>
		{/if}

		<div class="mt-8 p-4 flex justify-center">
			<Button
				class="flex items-center text-primary hover:text-primary-dark"
				on:click={handleRefreshPullRequests}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
				<span class="flex items-center ml-2">Refresh</span>
			</Button>
		</div>
	</List>
</div>
