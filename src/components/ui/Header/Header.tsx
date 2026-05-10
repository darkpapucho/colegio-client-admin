import styled from 'styled-components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { BiCog } from 'react-icons/bi';
import Select from '../../shared/Select';
import { Button } from '../../shared/Button';
import { FaPowerOff } from 'react-icons/fa';
import { Icon } from '../../shared/Icon';
import useCustomEvent from '../../../hooks/useCustomEvent';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAño } from '../../../config/redux/año/slice';
import { AÑOS_SELECT_OPTIONS, NIVELES_SELECT_OPTIONS } from '../../../utils/var';
import { setNivel } from '../../../config/redux/nivel/slice';
import { HandleLogOut } from '../../../utils/utils';
import { Text } from '../../shared/Text';
import { GiHamburgerMenu } from 'react-icons/gi';
import { theme } from '../../../config/styled/styled';
import { Container } from '../../shared/Container';
import { useContext } from 'react';
import { LayoutContext } from '../../../pages/Layout';

const StyledHeader = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / span 8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 3px black;
  min-width: 100%;
  height: 100px;
  background-color: ${theme.colors.primary[100]};
  @media (min-width: ${theme.mediaScreen.small}) {
    height: 80px;
    grid-column: 3 / span 7;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  gap: 0.5rem;
  text-transform: capitalize;
  @media (min-width: ${({ theme }) => theme.mediaScreen.small}) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  button {
    align-self: flex-end;
  }
`;

const Hamburger = styled.div`
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  height: 100%;
  align-items: flex-start;
  @media (min-width: ${theme.mediaScreen.small}) {
    display: none;
  }
`;
export default function Header() {
  const { data } = useTypedSelector((state) => state.user);
  const año = useTypedSelector((state) => state.año);
  const nivel = useTypedSelector((state) => state.nivel);
  const rol = data?.rol;
  const dispatch = useAppDispatch();
  const { setIsVisible } = useContext(LayoutContext)!;
  useCustomEvent('customSelect', listener);

  return (
    <StyledHeader id="header">
      {rol !== 'profesor' && (
        <Container $direction="row" $gap="2rem" $alignItems="center" $height="100%">
          <Hamburger onClick={() => setIsVisible((old) => !old)}>
            <Icon $primary $small $pointer>
              <GiHamburgerMenu />
            </Icon>
          </Hamburger>
          <Box>
            <Select small name="año" label="año" options={AÑOS_SELECT_OPTIONS} defaultValue={{ label: año + '', value: año }} width="7rem" />
            <Select small name="nivel" label="nivel" options={NIVELES_SELECT_OPTIONS} defaultValue={{ label: nivel!, value: nivel }} width="12.5rem" />
          </Box>
        </Container>
      )}
      <Box>
        <Text $bold $fontSize="small">
          {data?.nombres + ' ' + data?.apellidos}
        </Text>
        <Container $direction="row" $justifyContent="flex-end">
          <Button $danger $small onClick={() => HandleLogOut()} $width="max-content">
            Salir <FaPowerOff />
          </Button>
          <Icon $interactive $small $pointer>
            <BiCog />
          </Icon>
        </Container>
      </Box>
    </StyledHeader>
  );

  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'año') {
      dispatch(setAño(value));
    }
    if (name === 'nivel') {
      dispatch(setNivel(value));
    }
  }
}
