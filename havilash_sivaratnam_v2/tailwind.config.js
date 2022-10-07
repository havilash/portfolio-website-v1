/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkmode: '',
  theme: {
    fontFamily: {
      'body': ['Poppins'],
    },
    extend: {
      spacing: {
        'nav-width': '5rem'
      },
      colors: {
        'hue': 'var(--hue-color)',
        'main': {
          '100': 'hsl(var(--hue-color), 92%, 85%)',
          '300': 'hsl(var(--hue-color), 75%, 72%)',
          '500': 'hsl(var(--hue-color), 70%, 60%)',
          '700': 'hsl(var(--hue-color), 57%, 53%)',
          '900': 'hsl(var(--hue-color), 47%, 43%)',
        },
        'text': {
          '300': 'hsl(var(--hue-color), 8%, 45%)',
          '500': 'hsl(var(--hue-color), 8%, 65%)',
        },
        'title': 'hsl(var(--hue-color), 8%, 15%)',
        'body': 'hsl(var(--hue-color), 60%, 99%)',
        'nav': 'hsl(var(--hue-color), 60%, 99%)',
      },
      fontSize: {
        'big': '2rem',
        'h1': '1.5rem',
        'h2': '1.25rem',
        'h3': '1.125rem',
        'normal': '.938rem',
        'small': '.813rem',
        'smaller': '.75rem',
      },
    },
  },
  plugins: [],
}