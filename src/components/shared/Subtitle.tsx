import styled, { css } from 'styled-components';

export const Subtitle = styled.h1<{ $cursive?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fontFamily.header};

  letter-spacing: 1px;
  ${({ $cursive }) =>
    $cursive &&
    css`
      font-family: 'Young serif', serif;
    `}
`;
