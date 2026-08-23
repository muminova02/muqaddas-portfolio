/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#08090D",
        surface: "#0D1020",
        elevated: "#11131A",
        primary: "#F7F7FB",
        muted: "#A7AEC1",
        indigo: { DEFAULT: "#6C63FF" },
        violet: { DEFAULT: "#8B5CF6" },
        magenta: { DEFAULT: "#D946EF" },
        coral: { DEFAULT: "#FF6B9A" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "76rem" },
      keyframes: {
        "aurora-1": {
          "0%,100%": { transform: "translate(-8%, -6%) scale(1)" },
          "50%": { transform: "translate(6%, 8%) scale(1.15)" },
        },
        "aurora-2": {
          "0%,100%": { transform: "translate(6%, 4%) scale(1.1)" },
          "50%": { transform: "translate(-6%, -8%) scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
