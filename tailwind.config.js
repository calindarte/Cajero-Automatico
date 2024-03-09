/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {},
    fontFamily: {
      'sans': ['Manrope'],
    },
    fontWeight: {
      'bold': [800],
      'medium':[700],
      'normal':[500],
    }
  },
  plugins: [],
}

