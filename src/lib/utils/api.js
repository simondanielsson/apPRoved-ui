export const API_URL = process.env.VITE_API_URL;

export async function loginUser(formData) {
  console.log('Logging in through server, using API URL:', API_URL);
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			body: formData
		});
    console.log('Got server response:', response);
		const data = await response.json();
		return data;
	} catch {
		throw new Error('Login failed');
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
