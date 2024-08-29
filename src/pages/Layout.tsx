import styled from 'styled-components';
import SideBar from '../components/ui/SideBar/SideBar';
import Header from '../components/ui/Header/Header';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useFetchCurrentPeriodo from '../hooks/useFetchCurrentPeriodo';

const LayoutContainer = styled.div<{ $headerHeight: string }>`
  display: grid;
  grid-template-rows: max-content ${({ $headerHeight }) => `calc(100vh - ${$headerHeight}-10px)`};
  grid-template-columns: 1fr repeat(8, minmax(max-content, 200px)) 1fr;
  row-gap: 2rem;
`;
const LayoutContent = styled.div`
  grid-row: 2 / 3;
  grid-column: 3 / span 7;
`;

export default function Layout() {
  useFetchCurrentPeriodo();
  const [headerHeight, setHeaderHeight] = useState<string>('60px');
  useEffect(() => {
    const header = document.getElementById('header');
    const heigth = getComputedStyle(header!).height;
    setHeaderHeight(heigth);
  }, []);
  return (
    <LayoutContainer $headerHeight={headerHeight}>
      <Header />
      <SideBar />
      <LayoutContent>
        <Outlet />
      </LayoutContent>
    </LayoutContainer>
  );
}
