import styled from 'styled-components';
import SideBar from '../components/ui/SideBar/SideBar';
import Header from '../components/ui/Header/Header';
import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useFetchCurrentPeriodo from '../hooks/useFetchCurrentPeriodo';
import { theme } from '../config/styled/styled';

const LayoutContainer = styled.div<{ $headerHeight: string }>`
  display: grid;
  position: relative;
  grid-template-rows: 100px calc(100vh - 100px);
  grid-template-columns: 1fr repeat(8, minmax(max-content, 200px)) 1fr;
  @media (min-width: ${theme.mediaScreen.small}) {
    grid-template-rows: 80px calc(100vh - 80px);
  }
`;
const LayoutContent = styled.div`
  grid-row: 2 / span 1;
  grid-column: 2 / span 8;
  /* overflow: scroll; */
  min-height: calc(100vh - 100px);
  @media (min-width: ${theme.mediaScreen.small}) {
    min-height: calc(100vh - 80px);
    grid-row: 2 / span 1;
    grid-column: 3 / span 7;
  }
`;

export const LayoutContext = createContext<{ isVisible: boolean; setIsVisible: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);

export default function Layout() {
  useFetchCurrentPeriodo();
  const [headerHeight, setHeaderHeight] = useState<string>('60px');
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const header = document.getElementById('header');
    const heigth = getComputedStyle(header!).height;
    setHeaderHeight(heigth);
  }, []);
  return (
    <LayoutContext.Provider value={{ isVisible, setIsVisible }}>
      <LayoutContainer $headerHeight={headerHeight}>
        <Header />
        <SideBar />
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </LayoutContainer>
    </LayoutContext.Provider>
  );
}
