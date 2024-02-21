import styled from "styled-components";
import { Title } from "../../shared/Title";

const StyledLoginHeader = styled.header`
  width: 100%;
  height: 100%;
  padding: 1rem 0.6rem 0 0.6rem;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.indigo[800]};
`;
export default function LoginHeader() {
  return (
    <StyledLoginHeader>
      <Title $center $color="white">
        I.E.P. Jesús el Nazareno de Villas de Ancón
      </Title>
    </StyledLoginHeader>
  );
}
