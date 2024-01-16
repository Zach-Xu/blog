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
      },
      animation: {
        shake: 'shake 1s ease 0ms normal none running',
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
        }
      }
    },
  },
  plugins: [],
}