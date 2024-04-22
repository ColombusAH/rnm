/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      cursorColor: {
        'red': 'red',   // Defines a utility class `.cursor-color-red`
        'blue': 'blue', // Defines a utility class `.cursor-color-blue`
        'green': 'green' // Defines a utility class `.cursor-color-green`
      }
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

