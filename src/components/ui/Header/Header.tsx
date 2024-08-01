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

const StyledHeader = styled.div`
  grid-column: 2 / span 8;
  grid-row: 1 / 2;
  /* background-color: ${({ theme }) => theme.colors.secondary[200]}; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.padding.sm};
  box-shadow: 0 0 3px black;
  margin-top: 2rem;
  width: 100%;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;
`;
export default function Header() {
  const { data } = useTypedSelector((state) => state.user);
  const año = useTypedSelector((state) => state.año);
  const nivel = useTypedSelector((state) => state.nivel);

  const rol = data?.rol;
  const dispatch = useAppDispatch();
  useCustomEvent('customSelect', listener);

  return (
    <StyledHeader id="header">
      {rol !== 'profesor' && (
        <Box>
          <Select small name="año" label="año" options={AÑOS_SELECT_OPTIONS} defaultValue={{ label: año + '', value: año }} width="7rem" />
          <Select small name="nivel" label="nivel" options={NIVELES_SELECT_OPTIONS} defaultValue={{ label: nivel!, value: nivel }} width="12.5rem" />
        </Box>
      )}
      <Box>
        {data?.nombres + ' ' + data?.apellidos}
        <Button $danger $small onClick={() => HandleLogOut()}>
          Salir <FaPowerOff />
        </Button>
        <Icon $interactive $small $pointer>
          <BiCog />
        </Icon>
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
