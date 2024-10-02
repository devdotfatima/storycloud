import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#6A6FD5",
          100: "#EBECFF",
          400: "#AAADF4",
        },
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
