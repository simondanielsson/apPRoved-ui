import { writable } from 'svelte/store';

export const token = writable(null);

export function setToken(newToken) {
    token.set(newToken);
    localStorage.setItem('authToken', newToken);
}

export function clearToken() {
    token.set(null);
    localStorage.removeItem('authToken');
}

export function initializeToken() {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
        token.set(storedToken);
    }
}
