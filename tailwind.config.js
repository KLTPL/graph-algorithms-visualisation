/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#00a2ff",
      bgW: "#D4E5EF",
      marixGraphFieldEmpty: "#e9f3f8", 
      gray: "#50565a", 
      startAndEndNode: "#FFCC19",
      green: "#5eff00",
      orange: "#ff6200",
      black: "#0a0a0a",
    },
    extend: {},
  },
  plugins: [],
}

