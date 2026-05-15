import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "rgb(var(--color-bg) / <alpha-value>)",
        ink: "#111111",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        gold: "#C8A75B",
        "gold-light": "#E2C98A",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        cream: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      fontFamily: {
        title: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        premium: "var(--shadow-premium)",
      },
    },
  },
  plugins: [],
};

export default config;
