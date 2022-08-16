/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F0F7E9",
          200: "#DAEDCB",
          300: "#BCDEA2",
          400: "#8ABD70",
          500: "#6A9C40",
          600: "#4D7F21",
          700: "#345903",
        },
        secondary: {
          100: "#F0E6D4",
          200: "#CCBCA1",
          300: "#A29072",
          400: "#7C6A50",
          500: "#5A492D",
          600: "#4D3918",
          700: "#332509",
        },
        accent: {
          100: "#FFFCF5",
          200: "#FEF5E1",
          300: "#F4E2BB",
          400: "#D0B683",
          500: "#AB9053",
          600: "#8C7031",
          700: "#685114",
        },
        dark: {
          100: "#959595",
          200: "#7C7C7C",
          300: "#636363",
          400: "#4A4A4A",
          500: "#323232",
          600: "#191919",
          700: "#000000",
        },
        light: {
          100: "#FFFFFF",
          200: "#EFEFEF",
          300: "#E0E0E0",
          400: "#D1D1D1",
          500: "#C2C2C2",
          600: "#B3B3B3",
          700: "#A4A4A4",
        },
      },
    },
    fontFamily: {
      open: ["Open Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("flowbite/plugin")],
};
