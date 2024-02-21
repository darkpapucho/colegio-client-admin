import styled, { css } from 'styled-components';

export const Container = styled.div<{
  $padding?: string;
  $direction?: 'row' | 'column';
  $gap?: string;
  $bgColor?: string;
  $width?: string;
  $center?: boolean;
}>`
  display: flex;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  flex-direction: ${({ $direction }) => $direction || 'column'};
  ${({ $center }) =>
    $center &&
    css`
      justify-content: center;
      align-items: center;
      text-align: center;
    `}
  ${({ $padding }) =>
    $padding &&
    css`
      padding: ${$padding};
    `}
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
    ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `}
`;
