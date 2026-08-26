import styled, { css } from 'styled-components';

export const Icon = styled.div<{
  $interactive?: boolean;
  $primary?: boolean;
  $small?: boolean;
  $tiny?: boolean;
  $inset?: string;
  $pointer?: boolean;
  $color?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${({ $pointer }) =>
    $pointer &&
    css`
      cursor: pointer;
    `}
  ${({ $inset }) =>
    $inset &&
    css`
      position: absolute;
      inset: ${$inset};
    `}
  & > svg {
    ${({ $tiny, theme }) =>
      $tiny &&
      css`
        font-size: ${theme.iconSize.tiny};
      `}
    ${({ $small, theme }) =>
      $small &&
      css`
        font-size: ${theme.iconSize.sm};
      `}
    color: ${({ $primary, theme }) => ($primary ? theme.colors.primary[800] : theme.colors.tertiary[600])};
  }
  ${({ $interactive }) =>
    $interactive &&
    css`
      &:hover {
        > svg {
          scale: 1.1;
        }
      }
    `}
  &:hover {
    > svg {
      color: ${({ theme, $primary }) => ($primary ? theme.colors.primary[400] : theme.colors.secondary[800])};
    }
  }
  ${({ $color }) =>
    $color &&
    css`
      > svg {
        color: ${$color};
      }
    `}
`;
