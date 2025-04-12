import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    iconSize: {
      tiny: string;
      sm: string;
      md: string;
    };
    mediaScreen: {
      small: string;
      medium: string;
      large: string;
    };
    padding: {
      tiny: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      tiny: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontFamily: {
      display: string;
      header: string;
      text: string;
    };
    colors: {
      primary: {
        100: string;
        400: string;
        800: string;
      };
      secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      tertiary: {
        0: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      blue: {
        100: string;
        700: string;
      };
      green: {
        100: string;
        500: string;
        700: string;
        800: string;
      };
      yellow: {
        100: string;
        700: string;
      };
      silver: {
        100: string;
        700: string;
      };
      red: {
        100: string;
        500: string;
        700: string;
        800: string;
      };
      backdrop: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    borderRadius: {
      tiny: string;
      sm: string;
      md: string;
      lg: string;
    };
    image: {
      tertiaryScale: number;
      opacity: string;
    };
  }
  // export interface CSSProperties {
  //   'field-sizing'?: 'content' | 'fixed';
  //   fieldSizing?: 'content' | 'fixed'; // also try camelCase version
  // }
}
