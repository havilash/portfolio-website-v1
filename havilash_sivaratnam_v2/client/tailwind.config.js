/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'body': ['Poppins'],
    },
    extend: {
      spacing: {
        'nav-width': 'var(--nav-width)'
      },
      colors: {
        'hue-color': 'var(--hue-color)',
        'main-color': {
          '50': 'var(--main-color-50)',
          '100': 'var(--main-color-100)',
          '300': 'var(--main-color-300)',
          '500': 'var(--main-color-500)',
          '700': 'var(--main-color-700)',
          '900': 'var(--main-color-900)',
        },
        'text-color': {
          '300': 'var(--text-color-300)',
          '500': 'var(--text-color-500)',
          '700': 'var(--text-color-700)',
        },
        'title-color': 'var(--title-color)',
        'body-color': 'var(--body-color)',
        'nav-color': 'var(--nav-color)',
      },
    },
  },
  plugins: [],
}