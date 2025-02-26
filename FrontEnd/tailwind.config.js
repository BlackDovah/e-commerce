/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '412px',
        // => @media (min-width: 412px) { ... }
      },
    },
  },
  plugins: [],
}

