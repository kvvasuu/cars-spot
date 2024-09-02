/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoflex: ["Roboto Flex", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        primary: "#282828",
      },
    },
  },
  plugins: [],
};
