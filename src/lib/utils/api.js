export const API_URL = process.env.VITE_API_URL;

export async function loginUser(formData) {
    try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        console.log('loginUser function:', data);
        return data;
    } catch (error) {
        throw new Error('Login failed');
    }
}

export async function registerUser(formData) {
    try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('registerUser function:', data);
        return data.id;
    } catch (error) {
        throw new Error('Registration failed');
    }
}
