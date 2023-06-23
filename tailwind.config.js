/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#00a2ff",
      bg1: "#D4E5EF",
      marixGraphFieldEmpty: "#e9f3f8",
      nodeDefault: "#50565a",
      nodeStartOrEnd: "#FFCC19",
      nodeEndReached: "#5eff00",
      nodeBacktrack: "#ff6200",
      black: "#0a0a0a",
    },
    extend: {},
  },
  plugins: [],
};
