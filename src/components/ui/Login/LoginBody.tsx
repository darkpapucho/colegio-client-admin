import styled from 'styled-components';
import logo from '/logowhite.jpeg';
const Container = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2 / 7;
  grid-row: 2 / 3;
  position: relative;
  display: none;

  @media (min-width: ${({ theme }) => theme.mediaScreen.small}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function LoginBody() {
  return (
    <Container>
      {/* <Title $center $cursive $color="white">
        Educando con valores
      </Title> */}
      <img src={logo} style={{ width: '30rem' }}></img>
    </Container>
  );
}
