/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prime' : '#009fe3',
        'sec' : '#2D3663'
      },
      fontFamily: {
        'niramit': ['Niramit, sans-serif']
      }
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
}

