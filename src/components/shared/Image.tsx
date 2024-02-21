import styled from "styled-components";

export const Image = styled.img<{ $width: string; $ratio: string }>`
  width: ${({ $width }) => $width || "fit-content"};
  object-fit: contain;
  aspect-ratio: ${({ $ratio }) => $ratio};
  object-position: center;
`;
