import styled from 'styled-components';

export const GridContainer = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  display: grid;
  grid-template-columns: repeat(auto-fill, 185px);
  row-gap: 0.5rem;
`;
