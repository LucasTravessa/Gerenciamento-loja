import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        activePagination: "#d4d4d8",
        secondary: {
          DEFAULT: "#d4d4d8",
        },
      },
    },
  },
  plugins: [nextui()],
}) satisfies Config;
