/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chinese: ['"Ma Shan Zheng"', 'serif'],
        display: ['"Cinzel"', 'serif'],
      },
      colors: {
        gold: {
          400: '#f7d94c',
          600: '#c9a84c',
          800: '#8b6914',
        },
        imperial: {
          red: '#c01818',
          jade: '#1a9460',
          dark: '#0a0603',
        },
      },
    },
  },
  plugins: [],
}
