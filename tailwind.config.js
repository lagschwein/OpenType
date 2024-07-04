/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui')
  ]
}

