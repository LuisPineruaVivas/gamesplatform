/** @type {import('tailwindcss').Config} */
const { colors: defatColours } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defatColours,
        "primary": "#071D2C",
        "main" : "#031322",
        "accent": "#446171",
        "accent-secondary" : "#0A2737"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(0deg, rgba(254,127,31,1) 0%, rgba(254,132,35,1) 100%)",
      }
    },
    fontFamily: {
      display: "var(--heading-font)",
      sans: "var(--body-font)",
    }
  },
  plugins: [],
};
