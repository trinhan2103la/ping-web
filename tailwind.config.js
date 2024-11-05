/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#402E7A",
        blueNavy: "#4C3BCF",
        sea: "#a7b1ddc9",
        gra: "#3DC2EC",
        light: "#ffebff",
      },
    },
  },
  plugins: [],
};
