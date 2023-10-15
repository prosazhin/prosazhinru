/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const theme = require('pbstyles/styles/tailwindcss');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
      animation: {
        show: 'show 200ms ease-out',
        hide: 'hide 200ms ease-in',
        'modal-show': 'modal-show 200ms ease-out',
        'modal-hide': 'modal-hide 200ms ease-in',
        'slide-up': 'slide-up 200ms ease-out',
        'slide-down': 'slide-down 200ms ease-in',
      },
      keyframes: {
        show: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        hide: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        'modal-show': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },
        },
        'modal-hide': {
          '0%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(24px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: 1,
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(0px)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(24px)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
