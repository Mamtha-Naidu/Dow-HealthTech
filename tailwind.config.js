/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#20B2AA',
        'primary-light': '#3CBBA4',
        'primary-dark': '#1a9d96',
        'login-bg': '#DADADA',
        'login-gradient': '#ADEBC4',
        'login-text': '#022145',
        'login-text-light': '#A1A5B7',
        'login-border': '#E5E9EE',
        'login-border-light': '#EBEBEB',
        'login-link': '#006EEF',
        'login-placeholder': '#98A2B3',
        'login-button': '#00B77D',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-down': 'slideDown 0.3s ease',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
