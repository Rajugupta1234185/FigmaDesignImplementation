import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        body: "#2b2b2b",
        brand: "#1250f0",
        track: "#eeeeee",
        thumb: "#c9c9c9",
      },
      fontFamily: {
        sans: ['"Hanken Grotesk Variable"', "system-ui", "sans-serif"],
      },
      keyframes: {
        arrowMove:{
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(6px)"
          }
        },
      },
      animation:{
        arrowMove:"arrowMove 1s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};

export default config;
