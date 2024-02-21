import styled, { css } from 'styled-components';

export const Icon = styled.div<{ $interactive?: boolean; $primary?: boolean; $small?: boolean; $tiny?: boolean; $inset?: string; $pointer?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

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
    color: ${({ $primary, theme }) => ($primary ? theme.colors.orange[800] : theme.colors.gray[200])};
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
      color: ${({ theme, $primary }) => ($primary ? theme.colors.orange[400] : theme.colors.indigo[800])};
    }
  }
`;
