import styled, { css } from 'styled-components';
import { WidthCss } from '../../types/globals';
import { theme } from '../../config/styled/styled';

export const StyledInput = styled.input<{ $width?: WidthCss; $grow?: boolean }>`
  outline: none;
  border: none;
  padding: 4px;
  background-color: ${theme.colors.indigo[100]};
  font-family: ${({ theme }) => theme.fontFamily.sourceSans};
  &:disabled {
    border: none;
    background-color: ${theme.colors.gray[200]};
  }
  font-size: 1.3rem;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  ${({ $grow }) =>
    $grow &&
    css`
      flex: 1 0 auto;
    `}
`;
