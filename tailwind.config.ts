import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          "100": "#EBECFF",
          "400": "#AAADF4",
          DEFAULT: "#6A6FD5",
        },
        grey: {
          "100": "#EBEBEB",
          DEFAULT: "#B1B1B1",
        },
        green: {
          "100": "#D9F2CD",
          DEFAULT: "#5FB537",
        },
        red: {
          "100": "#FFDFDF",
          DEFAULT: "#E65151",
        },
      },
      screens: {
        "custom-h760-w1024": {
          raw: "(max-height: 760px) and (min-width: 1024px)",
        },
        // sm: "640px",
        // md: "768px",
        // lg: "1024px",
        // xl: "1280px",
        // "2xl": "1536px",
      },

      fontFamily: {
        crimson: ["var(--font-crimson-pro)", "serif"],
        mukta: ["var(--font-mukta)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
