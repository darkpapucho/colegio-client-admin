/**
 * Design tokens (plain data) — I.E.P. JESÚS EL NAZARENO
 * Brand palette: college blue 60% · white 25% · orange 15%.
 * `primary`/`secondary` map to the college blue scale;
 * `tertiary` maps to slate neutrals.
 * These tokens mirror the Tailwind 4 `@theme` values in src/main.css
 * and are consumed by components that pass CSS values as strings.
 */
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
    display: "'Poppins', sans-serif", //display text (h1)
    header: "'Poppins', sans-serif", //titles, subttitles
    text: "'Inter', sans-serif", //text
  },
  colors: {
    //primary color — college blue accent
    primary: {
      100: '#d6e7ff',
      400: '#4e92ff',
      800: '#004199',
    },
    //secondary — college blue scale
    secondary: {
      50: '#ebf3ff',
      100: '#d6e7ff',
      200: '#afceff',
      300: '#7fb0ff',
      500: '#1a75ff',
      600: '#0060f0',
      700: '#0052cc',
      800: '#004199',
      900: '#00306b',
    },
    //accent — college orange scale
    accent: {
      50: '#fff4ec',
      100: '#ffe6d4',
      200: '#ffc9a3',
      300: '#ffad73',
      500: '#f06000',
      600: '#d95800',
      700: '#b34a00',
      800: '#8c3b00',
      900: '#662c00',
    },
    //tertiary — neutral slate scale
    tertiary: {
      0: '#FFFFFF',
      50: '#FFFFFF',
      100: '#F8FAFC',
      200: '#F1F5F9',
      300: '#E2E8F0',
      400: '#CBD5E1',
      500: '#94A3B8',
      600: '#64748B',
      700: '#475569',
      800: '#1E293B',
      900: '#0F172A',
    },
    blue: {
      100: '#DBEAFE',
      700: '#1D4ED8',
    },
    green: {
      100: '#DCFCE7',
      500: '#22C55E',
      700: '#15803D',
      800: '#166534',
    },
    yellow: {
      100: '#FEF9C3',
      700: '#A16207',
    },
    silver: {
      100: '#E2E8F0',
      700: '#334155',
    },
    red: {
      100: '#FEE2E2',
      500: '#EF4444',
      700: '#B91C1C',
      800: '#991B1B',
    },
    backdrop: 'rgba(15, 23, 42, 0.5)',
  },
  shadows: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 6px 16px rgba(15, 23, 42, 0.08)',
    lg: '0 16px 40px rgba(15, 23, 42, 0.16)',
  },
  borderRadius: {
    tiny: '4px',
    sm: '8px',
    md: '10px',
    lg: '14px',
  },
  image: {
    tertiaryScale: 0,
    opacity: '100%',
  },
} as const;
