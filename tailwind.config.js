/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    'node_modules/tailwind-datepicker-react/dist/**/*.js',
    'node_modules/flowbite/**/*.js',
    'node_modules/react-tailwindcss-datepicker/dist/index.esm.js', 
    flowbite.content(),
  ],
  theme: {
    extend: {
      transitionDuration: {
      '10000': '10000ms',
    }},
    transitionProperty: {
      'height': 'height',
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

