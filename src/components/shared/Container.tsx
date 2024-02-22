import styled, { css } from 'styled-components';
import { WidthCss } from '../../types/globals';

export const Container = styled.div<{
  $padding?: string;
  $direction?: 'row' | 'column';
  $gap?: string;
  $bgColor?: string;
  $width?: string;
  $center?: boolean;
  $height?: WidthCss;
}>`
  display: flex;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  flex-direction: ${({ $direction }) => $direction || 'column'};
  ${({ $direction }) => {
    if ($direction === 'row') {
      return css`
        align-items: center;
      `;
    }
  }}
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
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
