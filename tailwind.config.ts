import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ayush: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        forest: {
          DEFAULT: "#064e3b",
          light: "#065f46",
          dark: "#022c22",
        },
        sage: {
          50: "#f6f8f6",
          100: "#e9f0e9",
          200: "#d3e0d3",
          300: "#b3c9b3",
          400: "#8dab8e",
          500: "#6e8e6f",
          600: "#557256",
          700: "#445b45",
          800: "#394a3a",
          900: "#303e31",
        },
        turmeric: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        clay: {
          50: "#faf7f5",
          100: "#f3ede8",
          200: "#e6d9d1",
          500: "#a27a64",
          700: "#70513e",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
