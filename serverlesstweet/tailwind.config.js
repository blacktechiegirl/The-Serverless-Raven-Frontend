/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/src/assets/loginbg.svg')",
      },
    },
    fontFamily: {
      smooch: ["Smooch"],
      sora: ["Sora"],
      montserrat: ["montserrat"],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scroll-behavior')()

  ],
};
