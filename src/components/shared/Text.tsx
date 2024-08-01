import styled, { css } from 'styled-components';
import { Size, WidthCss } from '../../types/globals';

export const Text = styled.div<{ $primary?: boolean; $fontSize?: Size; $bold?: boolean; $width?: WidthCss; $textAlign?: string }>`
  padding: 0;
  margin: 0;
  ${({ $primary, theme }) =>
    $primary &&
    css`
      color: ${theme.colors.primary[400]};
    `}
  ${({ $textAlign }) =>
    $textAlign &&
    css`
      text-align: ${$textAlign};
    `};
  ${({ $fontSize, theme }) => {
    if ($fontSize) {
      switch ($fontSize) {
        case 'large':
          return css`
            font-size: ${theme.fontSizes.lg};
          `;
        case 'medium':
          return css`
            font-size: ${theme.fontSizes.md};
          `;
        case 'small':
          return css`
            font-size: 1.2rem;
          `;
        default:
          return css`
            font-size: 1.3rem;
          `;
      }
    }
  }}
  font-family: ${({ theme }) => theme.fontFamily.text};
  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: bold;
    `};
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `};
  /* text-align: right; */
`;
