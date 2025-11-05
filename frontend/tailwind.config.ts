import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A64DFF",
          dark: "#8B3AD9",
          light: "#C180FF",
        },
        accent: {
          DEFAULT: "#33FF76",
          dark: "#1EE65C",
          light: "#5FFF95",
        },
        background: {
          DEFAULT: "#FFFFFF",
          gray: "#F8F9FA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
