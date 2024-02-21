import styled, { css } from 'styled-components';
import { Size } from '../../types/globals';

export const Text = styled.span<{ $fontSize?: Size; $bold?: boolean }>`
  margin-right: 0.5rem;
  font-size: ${({ $fontSize, theme }) => {
    switch ($fontSize) {
      case 'large':
        return theme.fontSizes.lg;
      case 'medium':
        return theme.fontSizes.md;
      case 'small':
        return theme.fontSizes.sm;
      default:
        return '1.3rem';
    }
  }};
  font-family: ${({ theme }) => theme.fontFamily.libreFranklin};
  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: bold;
    `}
`;
