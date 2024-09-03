/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Condensed", "sans-serif"],
        robotoflex: ["Roboto Flex", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        primary: "#282828",
        primarydark: "#1D1D1B",
        myblue: "#0147FF",
        white: "#F7F7F7",
      },
    },
  },
  plugins: [],
};
