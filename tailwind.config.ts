import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        gold: "#d4af37",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-foreground))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border-color))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        marquee: "marquee 22s linear infinite",
        float: "floatY 6s ease-in-out infinite",
        "float-slow": "floatY 9s 2s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.75)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
