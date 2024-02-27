import { createGlobalStyle } from 'styled-components';

export const theme = {
  iconSize: {
    tiny: '1rem',
    md: '1.5rem',
    sm: '2rem',
  },
  mediaScreen: {
    small: '640px',
    medium: '960px',
    large: '1200px',
  },
  padding: {
    tiny: '.3rem .6rem',
    sm: '1rem 1.4rem',
    md: '2rem 2.4rem',
    lg: '3rem 3.8rem',
    xl: '4rem 5.2rem',
  },
  fontSizes: {
    tiny: 'calc(1.4rem )',
    sm: 'calc(1.2rem + .2vw)',
    md: 'calc(1.8rem + .2vw)',
    lg: 'calc(2.4rem + .2vw)',
    xl: 'calc(3.2rem + .1vw)',
  },
  fontFamily: {
    newCycle: "'News Cycle', sans-serif",
    sourceSans: "'Source Sans 3', sans-serif",
    libreFranklin: "'Libre Franklin', sans-serif",
  },
  colors: {
    orange: {
      100: '#FDBF60',
      400: '#FFA447',
      800: '#FC6736',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#836FFF',
      500: '#6366f1',
      600: '#6366f1',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    gray: {
      0: '#fff',
      50: '#fff',
      100: '#f9fafb',
      200: '#f3f4f6',
      300: '#e5e7eb',
      400: '#d1d5db',
      500: '#9ca3af',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    blue: {
      100: '#e0f2fe',
      700: '#0369a1',
    },
    green: {
      100: '#50ea86',
      500: '#2D9596',
      700: '#0D9276',
      800: '#0D9276',
    },

    yellow: {
      100: '#fef9c3',
      700: '#a16207',
    },
    silver: {
      100: '#e5e7eb',
      700: '#374151',
    },
    red: {
      100: '#fee2e2',
      500: '#fc1703',
      700: '#b91c1c',
      800: '#991b1b',
    },
    backdrop: 'rgba(255, 255, 255, 0.1)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
    lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
  },
  borderRadius: {
    tiny: '3px',
    sm: '5px',
    md: '7px',
    lg: '9px',
  },
  image: {
    grayScale: 0,
    opacity: '100%',
  },
};

export const GlobalStyle = createGlobalStyle`
  *,*::after,*::before{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html{
    font-size: 62.5%;
    font-family: 'Libre Franklin', sans-serif;
    font-weight: 400;
    color: ${theme.colors.gray[800]};
  }
  body{
    box-sizing: inherit;
    font-size: calc(.8rem + .2vw);
    font-family: inherit;
    color: inherit;
  }
  a,a:visited,a:active{
    text-decoration: none;
    color:${theme.colors.gray[800]}
  }
`;
