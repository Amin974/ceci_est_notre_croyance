import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#FFFFFF",
        ink: "#111111",
        panel: "#FBFAF6",
        gold: "#C8A75B",
        "gold-light": "#E2C98A",
        cream: "#111111",
        muted: "#6B7280",
      },
      fontFamily: {
        title: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        premium: "0 18px 60px rgba(17, 17, 17, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
