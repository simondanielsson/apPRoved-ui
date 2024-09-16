import { writable } from 'svelte/store';

export const token = writable(null);

if (typeof window !== 'undefined') {
    console.log('token store: setting token from localStorage');
    const storedToken = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (storedToken) {
        console.log('Setting token from localStorage:', storedToken);
        token.set(storedToken);
    }
}

token.subscribe(value => {
    console.log('token subscription: received value', value);
    if (value) {
        localStorage.setItem('token', value);
    } else {
        localStorage.removeItem('token');
    }
});



