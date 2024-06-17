import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sans: ["Poppins"],
    },
    screens: {
      ["3xsm"]: "280px",
      ["2xsm"]: "320px",
      xsm: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      ["2xl"]: "1536px",
      ["3xl"]: "1920px",
      ["4xl"]: "2440px",
    },
    // If you don't want to use the "defaultTheme" provided by tailwindCss, set the colors outside of the extend.
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7BD3EA",
          10: "#F0FBFF",
          20: "#E0F6FF",
          30: "#D1F0FF",
          40: "#C1EBFF",
          50: "#A2DFFF",
          60: "#83D2FF",
          70: "#63C6FF",
          80: "#44B9FF",
          90: "#25ADFF",
          100: "#06A0FF",
        },
        secondary: {
          DEFAULT: "#A1EEBD",
          foreground: "#010816",
        },
        tertiary: {
          DEFAULT: "#F6F7C4",
        },
        quaternary: {
          DEFAULT: "#F6D6D6"
        },
        gray: "#ADADAD",
        black: "#000000",
        white: "#FFFFFF",
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#010816",
        background: "#ffffff",
        foreground: "#010816",
      },
      borderRadius: {
        xsm: "8px",
        sm: "12px",
        md: "24px",
        lg: "36px",
        xl: "48px",
        full: "9999px",
      },
      fontSize: {
        h1: "40px",
        h2: "32px",
        h3: "24px",
        h4: "20px",
        h5: "18px",
        h6: "16px",
        paragraph: "14px",
        small: "12px",
        hint: "10px",
      },
      fontWeight: {
        DEFAULT: "400",
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
