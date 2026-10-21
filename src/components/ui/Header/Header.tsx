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
import { Container } from '../../shared/Container';
import { useContext } from 'react';
import { LayoutContext } from '../../../pages/Layout';

export default function Header() {
  const { data } = useTypedSelector((state) => state.user);
  const año = useTypedSelector((state) => state.año);
  const nivel = useTypedSelector((state) => state.nivel);
  const rol = data?.rol;
  const dispatch = useAppDispatch();
  const { setIsVisible } = useContext(LayoutContext)!;
  useCustomEvent('customSelect', listener);

  return (
    <header id="header" className="col-[2/10] row-1 flex h-[100px] min-w-full items-center justify-between border-b border-slate-200 bg-white p-4 shadow-card sm:h-[80px] sm:col-[3/10] sm:p-6">
      {rol !== 'profesor' && (
        <Container $direction="row" $gap="2rem" $alignItems="center" $height="100%">
          <div onClick={() => setIsVisible((old) => !old)} className="flex h-full cursor-pointer items-start rounded-full p-4 sm:hidden">
            <Icon $primary $small $pointer>
              <GiHamburgerMenu />
            </Icon>
          </div>
          <div className="flex flex-col items-start gap-2 capitalize sm:flex-row sm:items-center sm:gap-4 [&>button]:self-end sm:[&>button]:self-auto">
            <Select small name="año" label="año" options={AÑOS_SELECT_OPTIONS} defaultValue={{ label: año + '', value: año }} width="7rem" />
            <Select small name="nivel" label="nivel" options={NIVELES_SELECT_OPTIONS} defaultValue={{ label: nivel!, value: nivel }} width="12.5rem" />
          </div>
        </Container>
      )}
      <div className="flex flex-col items-start gap-2 capitalize sm:flex-row sm:items-center sm:gap-4 [&>button]:self-end sm:[&>button]:self-auto">
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
      </div>
    </header>
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
