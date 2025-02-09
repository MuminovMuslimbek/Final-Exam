/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1200px", 
    xl: "1280px",
    "2xl": "1536px",
  },
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
};
