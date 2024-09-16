<script>
    import { page } from '$app/stores';
    import PopupNotification from '$lib/components/PopupNotification.svelte';

    let username = '';
    let password = '';
    let error = '';
    let successMessage = '';

    $: if ($page.url.searchParams.get('success') === '1') {
        successMessage = 'Registration successful! You can now log in.';
    }

    $: if ($page.form?.error) {
      error = $page.form.error;
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-primary mb-6">Login</h2>
        
        {#if error}
            <p class="text-red-500 mb-4">{error}</p>
        {/if}

        {#if successMessage}
          <PopupNotification type={"success"}> 
            {successMessage}
          </PopupNotification>
        {/if}

        <form method="POST" class="space-y-6">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" name="username" bind:value={username} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>
            
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" bind:value={password} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>
            
            <button type="submit" class="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition">Login</button>
        </form>
        
        <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <a href="/signup" class="text-primary hover:underline">Sign up</a>
        </p>
    </div>
</div>
