/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf5e9',
          100: '#f5ead4',
          200: '#ecd9b2',
          300: '#dcc08a',
        },
        sandstone: {
          400: '#c9a06a',
          500: '#a87a48',
          600: '#8a5f32',
        },
        terracotta: {
          400: '#c5553a',
          500: '#b33e23',
          600: '#8a3a22',
        },
        sage: {
          300: '#b4bfa5',
          400: '#8a9a7a',
          500: '#6e8060',
          600: '#5c6b52',
        },
        earth: {
          500: '#6b4e2e',
          600: '#4d371f',
          700: '#3a2a18',
        },
        ink: '#2a1f17',
      },
      fontFamily: {
        serif: ['Marcellus_400Regular'],
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
      },
    },
  },
  plugins: [],
};
