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
        dark: "#11131E",
        light: "#eceff180",
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
      screens: {
        lg: "900px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
