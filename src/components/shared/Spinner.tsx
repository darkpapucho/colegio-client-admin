import styled, { css } from 'styled-components';

export const Spinner = styled.div<{ $zIndex?: number }>`
  position: fixed;
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  ${({ $zIndex }) =>
    $zIndex &&
    css`
      z-index: ${Number($zIndex) + 1};
    `}
`;
