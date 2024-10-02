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
        background: "var(--background)",
        foreground: "var(--foreground)",
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
