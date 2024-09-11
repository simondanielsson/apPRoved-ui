<script>
    import { onMount } from 'svelte';
    import { initializeToken } from '$lib/stores/auth.js';
    import '../tailwind.css';

    onMount(() => {
        initializeToken();
    });
</script>

<slot />
