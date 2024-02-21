import styled, { css } from "styled-components";

export const Title = styled.h1<{ $cursive?: boolean; $center?: boolean; $color?: string }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  letter-spacing: 1.8px;
  font-family: ${({ theme }) => theme.fontFamily.newCycle};
  color: ${({ $color }) => $color || "black"};
  ${({ $center }) =>
    $center &&
    css`
      text-align: center;
    `}
  ${({ $cursive }) =>
    $cursive &&
    css`
      font-family: "Young serif", serif;
      font-style: italic;
      font-weight: 200;
    `}
`;
