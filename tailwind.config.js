/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {},

      screens: {
        360: '360px',
        400: '400px',
        420: '420px',
        450: '450px',
        480: '480px',
        500: '500px',
        520: '520px',
        575: '575px',
        640: '640px',
        768: '768px',
        1000: '1000px',
        1024: '1024px',
        1200: '1200px',
        1240: '1240px',
        1250: '1250px',
        1300: '1300px',
        1400: '1400px',
      },
    },
  },
  plugins: [],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  safelist: [
    'text-sm',
    'text-xs',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'bg-gray-12',
    'bg-gold-1',
    'w-full',
    'h-full',
    'w-3/4',
    'h-3/4',
    'w-2/4',
    'h-2/4',
    'w-1/4',
    'h-1/4',
  ],
}
