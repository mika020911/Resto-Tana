/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        dark: "#1a1a1a",
        glass: "rgba(255,255,255,0.6)",
      },
      backgroundImage:{
        "hero-gardient":  "linear-gradient(135deg, #f5e6d3 0%, #f0c4b0 40%, #e8a898 100%)",
      },
      backdropBlur:{
        glass: "12px",
      },
    },
  },
  plugins: [],
}

