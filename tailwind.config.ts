import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#282828",
          soft: "#363636",
          muted: "#5A5A5A",
          subtle: "#8A8A8A",
        },
        paper: {
          DEFAULT: "#FAFAF7",
          warm: "#F5F4EE",
          line: "#E8E6DF",
        },
        accent: {
          DEFAULT: "#B8956A",
          dark: "#8C6F4D",
        },
      },
      fontSize: {
        // Variation B — tighter, heavier display scale
        "display-2xl": ["clamp(3rem, 8.5vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-xl":  ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.96", letterSpacing: "-0.018em" }],
        "display-lg":  ["clamp(1.875rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.012em" }],
      },
      letterSpacing: { tightest: "-0.045em" },
      maxWidth: { "8xl": "88rem" },
      transitionTimingFunction: { smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
    },
  },
  plugins: [],
};

export default config;
