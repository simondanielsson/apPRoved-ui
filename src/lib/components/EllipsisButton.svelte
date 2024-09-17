<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { Icon, Trash } from 'svelte-hero-icons';

	let showOptions = false;
	const dispatch = createEventDispatcher();

	// Function to toggle the dropdown visibility
	function toggleOptions(event) {
		event.stopPropagation();
		showOptions = !showOptions;
	}

	function deleteElement(event) {
		event.stopPropagation();
		dispatch('delete');
		showOptions = false;
	}
	// Close the dropdown if clicking outside
	function closeOptions(event) {
		if (!event.target.closest('.options-dropdown')) {
			showOptions = false;
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', closeOptions);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', closeOptions);
		}
	});
</script>

<!-- The Ellipsis button -->
<div class="relative inline-block ellipsis-button" {...$$restProps}>
	<button
		class="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
		on:click|stopPropagation|preventDefault={toggleOptions}
		aria-label="Options"
	>
		<!-- Ellipsis Icon -->
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
				d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	</button>

	<!-- The Popup Menu (shown only when showOptions is true) -->
	{#if showOptions}
		<div
			class="absolute right-0 items-center mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 options-dropdown"
		>
			<button
				class="block items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 w-full text-left"
				on:click={deleteElement}
			>
				<Icon src={Trash} class="h-5 w-5 inline-block mr-2" />
				Delete
			</button>
		</div>
	{/if}
</div>

<style>
	.options-dropdown {
		z-index: 20;
	}
</style>
