/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        panel: "#111a2d",
        line: "#26324a",
        accent: "#7c5cff"
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,92,255,.18)"
      }
    }
  },
  plugins: []
};