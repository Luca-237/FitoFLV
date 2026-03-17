/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        winGray: '#c0c0c0',
        winBlue: '#000080',
        winDarkGray: '#808080',
        winLight: '#dfdfdf',
        xpBlue: '#245edb',
        xpBlueLight: '#5189f5',
        xpBlueDark: '#1a41a7',
      },
      backgroundImage: {
        'xp-gradient': 'linear-gradient(to bottom, #5189f5 0%, #2b78ef 4%, #245edb 6%, #2162e3 40%, #1a53c8 88%, #1a46b9 95%, #1e5ad3 100%)',
        'xp-button': 'linear-gradient(to bottom, #42a22a 0%, #3c9022 4%, #2e741a 100%)',
      },
      boxShadow: {
        'win-out': 'inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #000000, inset 2px 2px 0px 1px #dfdfdf, inset -2px -2px 0px 1px #808080',
        'win-in': 'inset 1px 1px 0px 1px #808080, inset -1px -1px 0px 1px #ffffff, inset 2px 2px 0px 1px #000000, inset -2px -2px 0px 1px #dfdfdf',
        'win-btn': 'inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #000000',
        'win-btn-active': 'inset 1px 1px 0px 1px #000000, inset -1px -1px 0px 1px #ffffff',
      },
      keyframes: {
  slide: {
    '0%, 100%': { transform: 'translateX(-10%)', width: '30%' },
    '50%': { transform: 'translateX(250%)', width: '50%' },
  }
}
    },
  },
  plugins: [],
}