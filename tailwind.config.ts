import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b1220",
          soft: "#111827"
        },
        fg: {
          DEFAULT: "#f8fafc",
          soft: "#cbd5e1"
        },
        brand: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff"
        },
        accent: "#22d3ee",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        muted: "#1f2937",
        border: "#1f2937"
      },
      borderRadius: {
        xl: "0.875rem"
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
