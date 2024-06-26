/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['Playwrite NG Modern', 'sans-serif'],
        playwriteDC: ['Playwrite ES Deco', 'sans-serif']
      },
      colors: {
        'pastel-red': '#FDEBEB',
        'pastel-pink': '#f4d2d2',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['bumblebee'],
  },
}
