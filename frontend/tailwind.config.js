/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      /* 🎨 COLORS */
      colors: {
        background: "#0b0f14",
        card: "#111827",
        border: "#1f2933",

        primary: "#3b82f6",
        accent: "#22c55e",
        warning: "#f59e0b",

        foreground: "#e5e7eb",
        muted: "#9ca3af",
      },

      /* 🔤 FONTS */
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
      },

      /* 🌈 SHADOWS */
      boxShadow: {
        glow: "0 0 30px rgba(59,130,246,0.35)",
        card: "0 10px 40px rgba(0,0,0,0.5)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.7)",
      },

      /* 🎞️ ANIMATIONS */
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 6s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
