<script>
	import { slide, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Drawer, { Content, Header, Title } from '@smui/drawer';
	import List, { Item } from '@smui/list';
	import { Icon, Home, Folder } from 'svelte-hero-icons';
	import NewCreateRepositoryModal from './NewCreateRepositoryModal.svelte';
	import Modal from './Modal.svelte';
	import { selectedRepository } from '$lib/stores/repository';
	import CreateRepositoryModal from './CreateRepositoryModal.svelte';

	export let repositories = [];
	let repo;
	let isSidebarExpanded = true;
	let showRepositories = false;
	let showCreateRepositoryModal = false;

	selectedRepository.subscribe((value) => {
		repo = value;
	});

	function handleSelectHome() {
		if (!isSidebarExpanded) {
			toggleSidebarSize();
		}
		selectedRepository.set(null);
		showRepositories = false;
	}

	function toggleSidebarSize() {
		isSidebarExpanded = !isSidebarExpanded;
	}

	function toggleRepositories() {
		if (!isSidebarExpanded) {
			toggleSidebarSize();
			showRepositories = true;
		} else {
			showRepositories = !showRepositories;
		}
	}

	function toggleCreateRepositoryModal() {
		showCreateRepositoryModal = !showCreateRepositoryModal;
	}

	function selectRepository(repository) {
		selectedRepository.set(repository);
	}

	// new
	let buttonPosition = { top: 0, left: 0, width: 0, height: 0 }; // Position of the button
	function openModal(event) {
		const buttonRect = event.target.getBoundingClientRect(); // Get button's position and size

		buttonPosition = {
			top: buttonRect.top,
			left: buttonRect.left,
			width: buttonRect.width,
			height: buttonRect.height
		};

		console.log('buttonPosition', buttonPosition);

		showCreateRepositoryModal = true;
	}
</script>

<Drawer
	variant="dismissible"
	open={true}
	class="bg-primary text-white h-full transition-all duration-300 {isSidebarExpanded
		? 'w-64'
		: 'w-24'}"
>
	<div class="flex flex-col h-full items-center">
		<!-- Header Section -->
		<Header class="flex items-center justify-between p-4">
			<div class="flex items-center">
				<img src="/favicon-32x32.png" alt="Icon" class="mr-2 w-8 h-8" />
				<!-- Increased size for better visibility -->
				{#if isSidebarExpanded}
					<span in:fade={{ duration: 100 }}>
						<Title class="text-xl font-bold text-white">apPRoved</Title>
					</span>
				{/if}
			</div>

			<button class="text-white {isSidebarExpanded ? 'ml-4' : ''}" on:click={toggleSidebarSize}>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-6 h-6 transition-transform transform duration-200 {isSidebarExpanded
							? ''
							: 'rotate-180'}"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"
						/>
					</svg>
				</span>
			</button>
		</Header>

		<!-- Content Section -->
		<Content class="flex-1 w-full">
			<List class="w-full items-center">
				<!-- Home Item -->
				<a
					class="flex items-center p-2 ml-4 mr-4 hover:bg-primary-dark rounded-lg transition-colors cursor-pointer"
					href={`/app`}
					on:click={handleSelectHome}
				>
					<Icon src={Home} class="h-6 w-6" solid />
					<span
						class="ml-4 text-base font-medium text-white whitespace-nowrap {isSidebarExpanded
							? ''
							: 'hidden'}">Home</span
					>
				</a>

				<!-- Repositories Item -->
				<Item
					class="flex items-center ml-4 mr-4 p-2 hover:bg-primary-dark rounded-lg transition-colors cursor-pointer"
					role="button"
					tabindex="0"
					on:click={toggleRepositories}
				>
					<Icon src={Folder} class="h-6 w-6" solid />
					<span
						class="ml-4 text-base font-medium text-white whitespace-nowrap {isSidebarExpanded
							? ''
							: 'hidden'}">Repositories</span
					>
					<span
						class="ml-auto mr-2 {isSidebarExpanded
							? 'block'
							: 'hidden'} transition-transform transform {showRepositories ? 'rotate-90' : ''}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</span>
				</Item>

				{#if showRepositories && isSidebarExpanded}
					<div class="mt-2 w-full" transition:slide={{ duration: 200, easing: cubicInOut }}>
						<List class="flex flex-col w-full bg-primary-dark p-2">
							{#each repositories as repository}
								<a
									class="p-2 rounded-lg hover:text-gray-300 w-full cursor-pointer {repo &&
									repo === repository
										? 'bg-gray-700'
										: ''}"
									href={`/app/repositories/${repository.id}`}
									on:click={() => selectRepository(repository)}
								>
									<span class="whitespace-nowrap">{repository.name}</span>
								</a>
							{/each}

							<Item
								class="p-2 mt-1 mb-2 items-center border text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
								role="button"
								tabindex="0"
								on:click={openModal}
							>
								<div class="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4v16m8-8H4"
										/>
									</svg>
									<span class="ml-2">Add Repository</span>
								</div>
							</Item>

							<!-- {#if showCreateRepositoryModal} -->
							<!--   <Modal bind:show={showCreateRepositoryModal} onClose={toggleCreateRepositoryModal} {buttonPosition}> -->
							<!--     <NewCreateRepositoryModal  -->
							<!--       onClose={toggleCreateRepositoryModal}  -->
							<!--       on:createRepository -->
							<!--       /> -->
							<!--   </Modal> -->
							<!-- {/if} -->
						</List>
					</div>
				{/if}
			</List>
		</Content>
	</div>
</Drawer>

<CreateRepositoryModal
	show={showCreateRepositoryModal}
	onClose={toggleCreateRepositoryModal}
	on:createRepository
/>
<!-- <Modal bind:show={showCreateRepositoryModal} {buttonPosition}> -->
<!--   <NewCreateRepositoryModal  -->
<!--     show={showCreateRepositoryModal}  -->
<!--     onClose={toggleCreateRepositoryModal}  -->
<!--     on:createRepository -->
<!--     /> -->
<!-- </Modal> -->
