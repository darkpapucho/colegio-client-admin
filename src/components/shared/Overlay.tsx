import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom, rgba(25, 25, 25, 0.5), rgba(25, 25, 25, 0.3));
  /* filter: blur(4px); */
  /* backdrop-filter: blur(4px); */
  z-index: 100;
`;
