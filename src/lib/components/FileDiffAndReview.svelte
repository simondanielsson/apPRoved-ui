<script>
	import { renderMarkdown } from '$lib/utils/markdown.js';
	import { renderDiff } from '$lib/utils/diff.js';

	export let selectedFileReview;
</script>

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

<style>
	.diff-container {
		background-color: #f6f8fa;
		padding: 10px;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		overflow-x: auto;
		position: sticky;
		overflow-y: hidden;
	}
</style>
