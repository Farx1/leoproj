/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6b00',
          dark: '#e05e00',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          darker: '#121212',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff6b00",
          "secondary": "#e05e00",
          "accent": "#ff9d4d",
          "neutral": "#1a1a1a",
          "base-100": "#121212",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}
