import styled from 'styled-components';
import { Title } from '../../shared/Title';

const StyledLoginHeader = styled.header`
  width: 100%;
  height: 100%;
  padding: 1rem 0.6rem 0 0.6rem;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary[800]};
`;
const Header = styled(Title)`
  font-family: ${({ theme }) => theme.fontFamily.display};
  letter-spacing: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 400;
`;
export default function LoginHeader() {
  return (
    <StyledLoginHeader>
      <Header $center $color="white">
        IEP JESÚS EL NAZARENO
      </Header>
    </StyledLoginHeader>
  );
}
