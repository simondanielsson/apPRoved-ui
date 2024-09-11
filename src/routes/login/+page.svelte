<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { loginUser } from '$lib/utils/api.js';
    import { loginSchema } from '$lib/models/auth.js';
    import { setToken } from '$lib/stores/auth.js';
    let username = '';
    let password = '';
    let error = '';

    async function handleLogin() {
        const result = loginSchema.safeParse({ username, password });  // Validate the input

        if (!result.success) {
            error = result.error.errors.map(e => e.message).join(", ");
            return;
        }
        try {
            const userData = await loginUser(username, password);
            setToken(userData.token);
            console.log('Login successful:', userData.token);
            goto('/');
        } catch (err) {
            error = 'Invalid username or password';
            console.error(err);
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-primary mb-6">Login</h2>
        
        {#if error}
            <p class="text-red-500 mb-4">{error}</p>
        {/if}
        
        <form on:submit|preventDefault={handleLogin} class="space-y-6">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" bind:value={username} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>
            
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" bind:value={password} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>
            
            <button type="submit" class="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition">Login</button>
        </form>
        
        <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <a href="/signup" class="text-primary hover:underline">Sign up</a>
        </p>
    </div>
</div>
