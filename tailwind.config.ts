import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        graphite: "#101112",
        ash: "#d8d8d4",
        chrome: "#f4f4ee",
        signal: "#baff39",
        ember: "#ff4d2e"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(186,255,57,0.12)",
        luxe: "0 30px 90px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
