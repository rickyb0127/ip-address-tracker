/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': {'min': '450px', 'max': '649px'},
      'tablet': {'min': '650px', 'max': '999px'},
      'desktop': {'min': '1000px'}
    },
    colors: {
      'black': 'var(--black)',
      'white': 'var(--white)',
      'very-dark-gray': 'var(--very-dark-gray)',
      'dark-gray': 'var(--dark-gray)',
      'alert-bar-red': 'var(--alert-bar-red)',
      'error-text': 'var(--error-text)'
    },
    extend: {
      backgroundImage: {
        'bg-mobile': "url('/images/pattern-bg-mobile.png')",
        'bg-desktop': "url('/images/pattern-bg-desktop.png')",
      }
    },
  },
  plugins: [],
}