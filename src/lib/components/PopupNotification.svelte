<script>
    import { onMount } from 'svelte';
    import { Icon, CheckCircle, ExclamationCircle } from "svelte-hero-icons";
    export let duration = 3000; // default duration to 3 seconds
    export let type = 'success'; // can be 'success' or 'error'

    let show = false;

    // When the component is mounted, show the notification, and hide it after the duration
    onMount(() => {
        show = true;
        setTimeout(() => {
            show = false;
        }, duration);
    });
</script>

<div
  class="fixed top-4 right-4 transition-transform transform-gpu duration-300 bg-white p-4 rounded-lg shadow-lg flex flex-row items-center"
  class:translate-x-[150%]={!show}
  class:translate-x-0={show}
>
  <div class="p-2">
    {#if type === 'success'}
      <Icon src={CheckCircle} class="h-8 w-8 text-green-500" solid />
    {:else}
      <Icon src={ExclamationCircle} class="h-8 w-8 text-red-500" solid />
    {/if}
  </div>

  <slot />
</div>
