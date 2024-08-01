import styled, { css } from 'styled-components';

export type ContainerProps = {
  $padding?: string;
  $direction?: 'row' | 'column';
  $gap?: string;
  $bgColor?: string;
  $width?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $height?: string;
  $position?: string;
  $border?: string;
  $pointer?: boolean;
  $color?: string;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  height: max-content;
  //pointer
  ${({ $pointer }) =>
    $pointer &&
    css`
      cursor: pointer;
    `}
  //border
  ${({ $border }) =>
    $border &&
    css`
      border: ${$border};
    `}
  //width
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  flex-direction: ${({ $direction }) => $direction || 'row'};

  //height
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  //padding
  ${({ $padding }) =>
    $padding &&
    css`
      padding: ${$padding};
    `}
  //gap
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
  //background-color
    ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `}
  //position
    ${({ $position }) =>
    $position &&
    css`
      position: ${$position};
    `}
  //center
   ${({ $alignItems }) => {
    return css`
      align-items: ${$alignItems};
    `;
  }}
   ${({ $justifyContent }) => {
    return css`
      justify-content: ${$justifyContent};
    `;
  }}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
`;
