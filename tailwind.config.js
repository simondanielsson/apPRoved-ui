// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A', 
          dark: '#162A6D',  
        },
        secondary: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
