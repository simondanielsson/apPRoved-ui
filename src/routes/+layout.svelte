<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { token } from '$lib/stores/auth.js';
    import { initializeToken } from '$lib/stores/auth.js';
    import '../tailwind.css';

    onMount(() => {
        initializeToken();
    });

    export async function load({ session }) {
        const userToken = get(token);
        console.log('User token:', userToken);

        if (!userToken) {
            goto('/login');
            return;
        }
    }
</script>

<slot />
