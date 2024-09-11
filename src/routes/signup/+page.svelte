<script>
    import axios from 'axios';
    import { registerUser } from '$lib/utils/api.js';
    import { registerSchema } from '$lib/models/auth.js';
    let username = '';
    let email = '';
    let password = '';
    let error = '';
    let success = '';

    async function handleSignUp() {
        const result = registerSchema.safeParse({ username, email, password });

        if (!result.success) {
            error = result.error.errors.map(e => e.message).join(", ");
            return;
        }
        try {
            const userData = await registerUser(username, email, password)
            success = 'Account created successfully. Please log in.';
            console.log(userData);
        } catch (err) {
            error = 'Error creating account. Please try again.';
            console.error(err);
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-primary mb-6">Sign Up</h2>

        {#if error}
            <p class="text-red-500 mb-4">{error}</p>
        {/if}
        
        {#if success}
            <p class="text-green-500 mb-4">{success}</p>
        {/if}

        <form on:submit|preventDefault={handleSignUp} class="space-y-6">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" bind:value={username} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>
            
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" bind:value={email} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" bind:value={password} required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
            </div>

            <button type="submit" class="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition">Sign Up</button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-4">
            Already have an account? <a href="/login" class="text-primary hover:underline">Log in</a>
        </p>
    </div>
</div>
