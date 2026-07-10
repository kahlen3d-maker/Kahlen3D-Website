import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Design – Primärfarben
        graphite: {
          DEFAULT: "#2B2B2B",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#CFCFCF",
          300: "#A6A6A6",
          400: "#7A7A7A",
          500: "#545454",
          600: "#3D3D3D",
          700: "#2B2B2B",
          800: "#1F1F1F",
          900: "#141414",
          950: "#0C0C0C",
        },
        // Kräftiges Grün
        brand: {
          DEFAULT: "#2F7D4A",
          50: "#EEF6F0",
          100: "#D6EADD",
          200: "#AFD6BD",
          300: "#7EBB96",
          400: "#4F9E6F",
          500: "#2F7D4A",
          600: "#26663C",
          700: "#1F5231",
          800: "#193F27",
          900: "#12301D",
        },
        // Akzentfarbe – Gelb
        accent: {
          DEFAULT: "#F4B400",
          50: "#FEF7E0",
          100: "#FDECB3",
          200: "#FBDE80",
          300: "#F9CF4D",
          400: "#F6C226",
          500: "#F4B400",
          600: "#C99400",
          700: "#9E7400",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        container: "1200px",
        wide: "1360px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,16,16,0.04), 0 8px 24px rgba(16,16,16,0.06)",
        card: "0 1px 3px rgba(16,16,16,0.05), 0 12px 40px rgba(16,16,16,0.08)",
        nav: "0 1px 0 rgba(16,16,16,0.06), 0 6px 24px rgba(16,16,16,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
