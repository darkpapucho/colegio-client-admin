import styled, { css } from 'styled-components';

export const Container = styled.div<{
  $cursor?: string;
  $padding?: string;
  $direction?: 'row' | 'column';
  $gap?: string;
  $bgColor?: string;
  $width?: string;
  $center?: boolean;
  $height?: string;
  $position?: string;
  $border?: boolean;
}>`
  ${({ $cursor }) =>
    $cursor &&
    css`
      cursor: ${$cursor};
    `}
  ${({ $border }) =>
    $border &&
    css`
      border: 1px solid black;
    `}
  display: flex;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  flex-direction: ${({ $direction }) => $direction || 'column'};
  /* ${({ $direction }) => {
    if ($direction === 'row') {
      return css`
        align-items: center;
      `;
    }
  }} */
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  ${({ $center }) =>
    $center &&
    css`
      /* justify-content: center; */
      align-items: center;
      text-align: center;
    `}

    /* ${({ $center, $direction }) => {
    return $center && $direction === 'column'
      ? css`
          justify-content: center;
          align-items: center;
          justify-content: center;
        `
      : css`
          align-items: center;
          justify-content: flex-start;
        `;
  }}; 
  */
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
    ${({ $position }) =>
    $position &&
    css`
      position: ${$position};
    `}
`;
