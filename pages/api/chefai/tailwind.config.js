/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
  extend: {
    fontFamily: {
      arabic: ['"Amiri"', 'serif'], // ou une autre police arabe
    },
  },
},
  plugins: [],
  }
