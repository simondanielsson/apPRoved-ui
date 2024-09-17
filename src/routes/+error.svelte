<script>
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
		<h2 class="text-2xl font-bold text-center text-primary mb-6">Something went wrong</h2>
		<p class="text-l font-bold mb-6">{$page.error.message}</p>
		<a
			href="/login"
			class="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition"
			>Login</a
		>
	</div>
</div>
