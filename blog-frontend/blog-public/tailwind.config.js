/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer': 'linear-gradient(-45deg, #ec8c69, #e9546b, #38a1db, #23d5ab)',
        'gradient-pink': 'linear-gradient(to right, #c67696, #c78a75)',
        'side-drawer': 'linear-gradient(to right, rgba(0, 0, 0, 0) 50%, #21252b 50%)',
        'archive': "url('/assets/bg2.png')",
      },
      animation: {
        shake: 'shake 1s ease 0ms normal none running',
        wave: 'wave 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite'
      },
      keyframes: {
        shake: {
          '0% ': {
            transform: 'scale(1)'
          },

          '10%, 20%': {
            transform: 'scale(0.9) rotate(3deg)'
          },

          '30%, 50%, 70%, 90%': {
            transform: 'scale(1.1) rotate(-3deg)'
          },

          '40%, 60%, 80%': {
            transform: 'scale(1.1) rotate(3deg)'
          },

          '100%': {
            transform: 'scale(1)'
          }
        },
        wave: {
          '0% ': {
            transform: 'translate3d(-90px, 0, 0)'
          },

          '100%': {
            transform: 'translate3d(85px, 0, 0)'
          }
        }
      }
    },
  },
  plugins: [],
}