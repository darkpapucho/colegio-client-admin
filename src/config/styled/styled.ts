import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const theme: DefaultTheme = {
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
    sm: 'clamp(3px, 1.2vw, 5px)',
    md: 'clamp(5px, 1.8vw, 10px)',
    lg: '3rem 3.8rem',
    xl: '4rem 5.2rem',
  },
  fontSizes: {
    tiny: 'clamp(10px, 1.2vw, 12px)',
    sm: 'clamp(12px, 1.2vw, 16px)', //texto
    md: 'clamp(16px, 1.8vw, 20px)', //subtitulos
    lg: 'clamp(24px, 1.8vw, 28px)', //titulos
    xl: 'clamp(32px, 2vw, 48px)', //h1
  },
  fontFamily: {
    display: "'Anton', sans-serif;", //display text (h1)
    header: "'Poppins', sans-serif", //titles , subttitles
    text: "'Inter', sans-serif", //text
  },
  colors: {
    //primary color
    primary: {
      100: '#FDBF60',
      400: '#FFA447',
      800: '#FC6736',
    },
    //secondary
    secondary: {
      50: '#eef2ff',
      100: '#eef2ff',
      200: '#c7d2fe',
      300: '#c7d2fe',
      500: '#6366f1',
      600: '#6366f1',
      700: '#3730a3',
      800: '#3730a3',
      900: '#3730a3',
    },
    tertiary: {
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
    tertiaryScale: 0,
    opacity: '100%',
  },
};

export const GlobalStyle = createGlobalStyle`
  *,*::after,*::before{
    box-sizing: border-box;
    /* margin: 0;
    padding: 0; */
  }

  html{
    font-size: 62.5%;
    font-family: 'Libre Franklin', sans-serif;
    font-weight: 400;
    color: ${theme.colors.tertiary[800]};
  }
  body{
    box-sizing: inherit;
    font-size: calc(.8rem + .2vw);
    font-family: inherit;
    color: inherit;
    overflow:auto;

  }
  a,a:visited,a:active{
    text-decoration: none;
    color:${theme.colors.tertiary[800]}
  }
`;
