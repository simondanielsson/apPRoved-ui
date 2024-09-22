export const API_URL = process.env.API_URL || 'http://approved-api-620648088594.europe-north1.run.internal/api/v1';

export async function loginUser(formData) {
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

export async function registerUser(formData) {
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
