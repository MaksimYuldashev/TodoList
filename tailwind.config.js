/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': '2.4rem 1fr 1.6rem'
      },
      boxShadow: {
        'custom': '0px 0px 10px 5px rgba(112,112,112,0.7)',
      },
    },
  },
  plugins: [],
}

