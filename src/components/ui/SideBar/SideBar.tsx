import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { menuItems } from '../../../utils/var';
import { useContext, useState } from 'react';
import { UserRol } from '../../../types/user';
import CloseButton from './CloseButton';
import { LayoutContext } from '../../../pages/Layout';
import logo from '/logo.png';
import { Container } from '../../shared/Container';

export default function SideBar() {
  const [active, setActive] = useState<number>(-1);
  const { data } = useTypedSelector((state) => state.user);
  const rol = data?.rol as UserRol; //"admin" || "profesor"
  const items = menuItems[rol];
  const { isVisible, setIsVisible } = useContext(LayoutContext)!;
  return (
    <aside className={`fixed top-0 left-0 z-10 h-screen flex-col justify-between border-r border-slate-200 bg-white p-8 font-[11px] shadow-card uppercase sm:static sm:col-[2/3] sm:row-[1/3] sm:h-auto sm:z-auto ${isVisible ? 'flex' : 'hidden'} sm:flex`}>
      <CloseButton action={toggleVisibility} />
      <div className="flex w-full justify-center p-8">
        <img src={logo} className="w-[90px] object-cover"></img>
      </div>
      <Container $direction="column" $gap="0.4rem">
        {items.map((item, index) => {
          return (
            <NavLink
              to={item.url}
              key={index}
              onClick={() => onClickItem(index)}
              className={`flex items-center gap-2.5 rounded-lg px-3.5 py-2.8 font-display transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 ${
                active === index ? 'bg-brand-100 text-brand-800 shadow-[inset_3px_0_0_0_#0060f0] font-semibold' : 'text-slate-600'
              } [&>svg]:text-base`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          );
        })}
      </Container>
    </aside>
  );
  function toggleVisibility() {
    setIsVisible((old) => !old);
  }
  function onClickItem(index: number) {
    setActive(index);
    if (isVisible) {
      setIsVisible(false);
    }
  }
}
