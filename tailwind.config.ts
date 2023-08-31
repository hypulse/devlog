import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "rgba(var(--background), <alpha-value>)",
      card: "rgba(var(--card), <alpha-value>)",
      text: "rgba(var(--text), <alpha-value>)",
      textSecondary: "rgba(var(--text-secondary), <alpha-value>)",
      border: "rgba(var(--border), <alpha-value>)",
      primary: "rgba(var(--primary), <alpha-value>)",
      secondary: "rgba(var(--secondary), <alpha-value>)",
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
    },
    screens: {
      tablet: "600px",
      desktop: "1024px",
    },
    fontSize: {
      h1: "3rem",
      h2: "1.5rem",
      h3: "1.25rem",
      base: "1rem",
      caption: "0.875rem",
      xs: "0.75rem",
    },
    spacing: {
      0: "0",
      inputPadding: "0.375rem",
      buttonPaddingX: "0.8rem",
      buttonPaddingY: "0.4rem",
      tagPaddingX: "0.6rem",
      tagPaddingY: "0.2rem",
      cardPadding: "1rem",
      containerPadding: "1.5rem",
      sectionGap: "4rem",
      extraGap: "2.5rem",
      elementGap: "1.5rem",
      rowGap: "0.5rem",
      colGap: "0.75rem",
      xsGap: "0.375rem",
      gap: "0.8rem",
    },
    borderRadius: {
      DEFAULT: "0.5rem",
      sm: "0.375rem",
      full: "9999px",
    },
    fontWeight: {
      light: "200",
      base: "300",
      bold: "500",
    },
  },
  plugins: [],
};
export default config;
