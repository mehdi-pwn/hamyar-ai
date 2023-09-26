/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: "#11131E",
        light: "#616161",
        primary: "#4E43FA",
        secondary: "#3618d3",
      },
      borderColor: {
        primary: "#4E43FA",
      },
      textColor: {
        primary: "#4E43FA",
        secondary: "#3618d3",
      },
      fontFamily: {
        ordibehesht: "Ordibehesht",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
