/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff4ed",
          100: "#ffe6d4",
          200: "#ffc9a8",
          300: "#ffa270",
          400: "#ff7a45",
          500: "#ff5a1f",
          600: "#f03e0b",
          700: "#c72d0b",
          800: "#9e2611",
          900: "#7f2311",
        },
        ink: {
          950: "#09090b",
          900: "#0f0f12",
          850: "#141418",
          800: "#1a1a1f",
          700: "#26262c",
          600: "#34343c",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Barlow Condensed"', "Inter", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,90,31,0.25), 0 10px 40px -10px rgba(255,90,31,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
