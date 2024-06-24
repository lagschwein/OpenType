const {nextui} = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      themes: {
        "catppuccin-latte": {
          colors: {
            background: "#eff1f5",
            foreground: "#ccd0da",
            primary: {
              100: "#E9EBF7",
              200: "#D5D9F0",
              300: "#AFB3D2",
              400: "#8286A4",
              500: "#4C4F69",
              600: "#373A5A",
              700: "#26294B",
              800: "#181A3C",
              900: "#0E1032",
              DEFAULT: "#4C4F69",
              foreground: "#ea76cb"
            },
            secondary: {
              100: "#EFD7FE",
              200: "#DBB0FD",
              300: "#C387FA",
              400: "#AC69F5",
              500: "#8839EF",
              600: "#6929CD",
              700: "#4E1CAC",
              800: "#36128A",
              900: "#250A72",
            },
            danger: {
              100: "#FCD5CD",
              200: "#FAA49D",
              300: "#F16A6E",
              400: "#E34558",
              500: "#D20F39",
              600: "#B40A3F",
              700: "#970741",
              800: "#79043F",
              900: "#64023D",
              DEFAULT: "#D20F39",
              foreground: "#D20F39"
            },
            content: "#c6d0f5",
            focus: "#dc8a78",

          }
        }
      }
    }
  )]
}

