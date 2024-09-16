<script>
  export let confirmText = "Confirm";
  export let cancelText = "Cancel";
  export let isOpen = false;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Close the modal by dispatching a close event
  function closeModal() {
    dispatch('close');
  }

  // Dispatch confirm event
  function confirmAction() {
    dispatch('confirm');
    closeModal();
  }

  // Dispatch cancel event
  function cancelAction() {
    dispatch('cancel');
    closeModal();
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
      <slot />

      <div class="flex justify-end space-x-2">
        <button class="px-4 py-2 bg-gray-200 rounded" on:click={cancelAction}>
          {cancelText}
        </button>
        <button class="px-4 py-2 bg-red-600 text-white rounded" on:click={confirmAction}>
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}
