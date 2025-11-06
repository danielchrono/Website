/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a192f',
        lightNavy: '#112240',
        slate: '#8892b0',
        lightestSlate: '#ccd6f6',
        brand: '#64ffda',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        countUp: {
          '0%': { content: '"0"' },
          '100%': { content: 'attr(data-count)' }
        }
      },
      height: {
        'screen': '100vh',
        'screen-dvh': '100dvh',
      },
      minHeight: {
        'screen': '100vh',
        'screen-dvh': '100dvh',
      }
    },
  },
  plugins: [],
}