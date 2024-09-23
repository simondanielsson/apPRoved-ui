export async function loginUser(formData, API_URL) {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Login failed: ' + error);
	}
}

export async function registerUser(formData, API_URL) {
	try {
		const response = await fetch(`${API_URL}/register`, {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		return data.id;
	} catch {
		throw new Error('Registration failed');
	}
}
