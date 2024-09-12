import axios from 'axios';
import { get } from 'svelte/store';
import { token } from '$lib/stores/auth.js';

const API_BASE_URL = 'http://localhost:8090/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const userToken = get(token);
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export async function loginUser(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the header for form data
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
}

export async function registerUser(username, email, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    try {
        const response = await axios.post(`${API_BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
}
