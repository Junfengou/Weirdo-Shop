/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
      },
      gridTemplateRows: {
        header: "64px auto", //for the navbar layout
      },
      screens: {
        'product-view-mobile': {'min': '300px', 'max': '770px'},
        'product-list-view-tablet-l': {'min': '772px', 'max': '1230px'},
        'product-list-view-mobile-l': {'min': '500px', 'max': '770px'},
        'product-list-view-mobile-m': {'min': '300px', 'max': '500px'},
      }
    },
  },
};
