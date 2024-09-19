import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { menuItems } from '../../../utils/var';
import { useState } from 'react';
import { UserRol } from '../../../types/user';

const Item = styled(NavLink)<{ $active: boolean }>`
  padding: ${({ theme }) => theme.padding.sm};
  font-family: ${({ theme }) => theme.fontFamily.header};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  margin: ${({ theme }) => theme.padding.sm};
  > svg {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  &:hover {
    box-shadow: 0 0 2px black;
  }
  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 0 2px black;
    `}/* display: none;
  @media (min-width: ${({ theme }) => theme.mediaScreen.small}) {
    display: block;
  } */
`;

const SideMenuContainer = styled.aside`
  padding-top: 5rem;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  text-transform: capitalize;
`;

export default function SideBar() {
  const [active, setActive] = useState<number>(-1);
  const { data } = useTypedSelector((state) => state.user);
  const rol = data?.rol as UserRol; //"admin" || "profesor"
  const items = menuItems[rol];
  return (
    <SideMenuContainer>
      {items.map((item, index) => {
        return (
          <Item to={item.url} key={index} onClick={() => setActive(index)} $active={active === index ? true : false}>
            {item.icon}
            {item.label}
          </Item>
        );
      })}
    </SideMenuContainer>
  );
}
