import styled, { css } from "styled-components";

export const Subtitle = styled.h1<{ $cursive?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fontFamily.newCycle};
  letter-spacing: 1.4px;
  ${({ $cursive }) =>
    $cursive &&
    css`
      font-family: "Young serif", serif;
    `}
`;
