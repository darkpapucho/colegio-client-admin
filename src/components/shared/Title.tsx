import styled, { css } from 'styled-components';

export const Title = styled.h1<{ $cursive?: boolean; $center?: boolean; $color?: string }>`
  word-wrap: break-word;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  letter-spacing: 1px;
  font-family: ${({ theme }) => theme.fontFamily.header};
  color: ${({ $color }) => $color || 'black'};

  ${({ $center }) =>
    $center &&
    css`
      text-align: center;
    `}
  ${({ $cursive }) =>
    $cursive &&
    css`
      font-family: 'Young serif', serif;
      font-style: italic;
      font-weight: 200;
    `}
`;
