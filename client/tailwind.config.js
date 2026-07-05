/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          light: '#1B2F4A',
          DEFAULT: '#0B1F3A',
          dark: '#051224',
        },
        gold: {
          light: '#E5C05E',
          DEFAULT: '#D4AF37',
          dark: '#A6841C',
        },
        slateGray: '#5C6B73',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.2)',
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
