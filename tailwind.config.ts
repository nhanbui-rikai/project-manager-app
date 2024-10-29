import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        mobile: "480px",
        tablet: "768px",
        pc: "1024px",
        "large-pc": "1280px",
      },
      height: {
        authScreen: "calc(100vh - 32px)",
        main: "calc(100vh - 120px)",
      },
    },
  },
  plugins: [],
};
export default config;
