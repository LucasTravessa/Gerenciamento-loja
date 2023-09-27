import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"]
    },
    colors: {
      'gray': '#D9D9D9',
      'gray-dark': '#C3C3C3',
    },
    extend: {},
  },
  plugins: [],
}
export default config
