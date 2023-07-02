/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
      },
      gridTemplateRows: {
        header: "64px auto", //for the navbar layout
      },
      screens: {
        'product-view-mobile': {'min': '300px', 'max': '770px'},
        'product-list-view-tablet-l': {'min': '670px', 'max': '957px'},
        'product-list-view-mobile-m': {'min': '200px', 'max': '670px'},

        'home-product-list-view-tablet-l': {'min': '630px', 'max': '959px'},
        'home-product-list-view-mobile-m': {'min': '200px', 'max': '630px'},

      }
    },
  },
});
