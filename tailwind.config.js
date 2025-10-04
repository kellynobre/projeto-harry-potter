/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
        fontFamily: {
            harry: ['Harry', 'sans-serif'],
        },
        screens: {
            sm: { max: '640px' },   // telas até 640px
            md: { max: '768px' },   // telas até 768px
            lg: { min: '769px', max: '1024px' }, // entre 769px e 1024px
            xl: { min: '1025px', max: '1280px' }, // entre 1025px e 1280px
            '2xl': { min: '1281px' } // acima de 1281px
        }
  },
  plugins: [],
}
