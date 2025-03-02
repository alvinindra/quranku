import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%'
          }
        }
      },
      fontFamily: {
        sans: [
          'var(--font-poppins)',
          ...fontFamily.sans
        ],
        display: 'var(--font-isep-misbah)'
      },
      dropShadow: {
        custom: '0px 2px 16px rgba(138, 138, 142, 0.25)',
        dark: '0px 3px 8px 4px #2F2F2F',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
