import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { menuItems } from '../../../utils/var';
import { useContext, useState } from 'react';
import { UserRol } from '../../../types/user';
import { theme } from '../../../config/styled/styled';
import CloseButton from './CloseButton';
import { LayoutContext } from '../../../pages/Layout';
import logo from '/logo.png';
import { Container } from '../../shared/Container';

const SideMenuContainer = styled.aside<{ $isVisible: boolean }>`
  position: fixed;
  height: 100vh;
  display: ${({ $isVisible }) => {
    return $isVisible ? 'flex' : 'none';
  }};
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  text-transform: capitalize;
  border: 1px solid blue;
  z-index: 10;
  background-color: white;
  justify-content: space-between;
  padding: 2rem 1rem;
  @media (min-width: ${theme.mediaScreen.small}) {
    display: flex;
    position: relative;
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }
`;

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
  ${({ $active, theme }) =>
    $active &&
    css`
      background-color: ${theme.colors.primary[100]};
      box-shadow: 0 0 2px ${theme.colors.primary[400]};
    `}
`;
const ImageContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  img {
    width: 90px;
    object-fit: cover;
  }
`;
export default function SideBar() {
  const [active, setActive] = useState<number>(-1);
  const { data } = useTypedSelector((state) => state.user);
  const rol = data?.rol as UserRol; //"admin" || "profesor"
  const items = menuItems[rol];
  const { isVisible, setIsVisible } = useContext(LayoutContext)!;
  return (
    <SideMenuContainer $isVisible={isVisible}>
      <CloseButton action={toggleVisibility} />
      <ImageContainer>
        <img src={logo}></img>
      </ImageContainer>
      <Container $direction="column" $gap="0.4rem">
        {items.map((item, index) => {
          return (
            <Item to={item.url} key={index} onClick={() => onClickItem(index)} $active={active === index ? true : false}>
              {item.icon}
              {item.label}
            </Item>
          );
        })}
      </Container>
    </SideMenuContainer>
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
