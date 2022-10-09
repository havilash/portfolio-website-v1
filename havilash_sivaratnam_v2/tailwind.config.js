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
          '100': 'hsl(var(--hue-color), 92%, 85%)',
          '300': 'hsl(var(--hue-color), 75%, 72%)',
          '500': 'hsl(var(--hue-color), 69%, 61%)',
          '700': 'hsl(var(--hue-color), 57%, 53%)',
          '900': 'hsl(var(--hue-color), 47%, 43%)',
        },
        'text-color': {
          '300': 'hsl(var(--hue-color), 8%, 45%)',
          '500': 'hsl(var(--hue-color), 8%, 65%)',
        },
        'title-color': 'hsl(var(--hue-color), 8%, 15%)',
        'body-color': 'hsl(var(--hue-color), 60%, 99%)',
        'nav-color': 'hsl(var(--hue-color), 60%, 99%)',
      },
    },
  },
  plugins: [],
}