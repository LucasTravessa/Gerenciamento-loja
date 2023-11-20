import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [nextui()],
} satisfies Config;
