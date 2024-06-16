const SCREENS = {
  xs: '390px',
  sm: '640px',
  md: '768px',
  '2md': '860px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
};

/* eslint-disable no-undef */
module.exports = {
  theme: {
    screens: SCREENS,
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': SCREENS['2xl'],
      },
    },
    extend: {
      transitionDuration: {
        DEFAULT: '300ms',
        400: '400ms',
        1000: '1000ms',
        2000: '2000ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'easy-in-out',
      },
      keyframes: {
        'spin-180deg': {
          from: {transform: 'rotate(0deg)'},
          to: {transform: 'rotate(180deg)'},
        },
      },
      animation: {
        'spin-180deg': 'spin-180deg 1s ease-in-out 0.4s infinite',
      },
    },
  },
};
