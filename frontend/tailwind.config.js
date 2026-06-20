/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          "blue-light": "#60A5FA",
          "blue-dark": "#1D4ED8",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F8FAFC",
        },
        ink: {
          900: "#0F172A",
          700: "#334155",
          500: "#64748B",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(15, 23, 42, 0.08)",
        glow: "0 8px 40px -8px rgba(37, 99, 235, 0.35)",
        card: "0 2px 16px -4px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "gradient-x": "gradient-x 6s ease infinite",
      },
    },
  },
  plugins: [],
};
