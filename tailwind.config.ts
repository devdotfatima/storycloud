import type { Config } from "tailwindcss";

const config: Config = {
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
          DEFAULT: "#6A6FD5",
          100: "#EBECFF",
          400: "#AAADF4",
        },
        grey: { DEFAULT: "#B1B1B1", 100: "#EBEBEB" },

        green: { DEFAULT: "#5FB537", 100: "#D9F2CD" },

        red: { DEFAULT: "#E65151", 100: "#FFDFDF" },
      },
      fontFamily: {
        crimson: ["var(--font-crimson-pro)", "serif"], // Use Crimson Pro
        mukta: ["var(--font-mukta)", "sans-serif"], // Use Mukta
      },
    },
  },
  plugins: [],
};
export default config;
