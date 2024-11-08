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
        danger: "#FF5E5E",
        primary: "#546FFF",
        success: "#6FD96F",
        warning: "#F29D56",
        secondary: "#9097C4",
        light: "#f8f9fa",
        dark: "#333333",
      },
      screens: {
        mobile: "480px",
        tablet: "768px",
        pc: "1024px",
        "large-pc": "1280px",
      },
      maxWidth: {
        main: "1520px",
        "table-cell": "500px",
      },

      height: {
        authScreen: "calc(100vh - 32px)",
        main: "calc(100vh - 120px)",
      },
      width: {
        "main-modal": "700px",
      },
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 4 0%",
        "5": "5 5 0%",
        "6": "6 6 0%",
        "7": "7 7 0%",
        "8": "8 8 0%",
      },
    },
  },
  important: true,
  plugins: [],
};
export default config;
