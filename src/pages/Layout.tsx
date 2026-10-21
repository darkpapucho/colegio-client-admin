import SideBar from '../components/ui/SideBar/SideBar';
import Header from '../components/ui/Header/Header';
import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useFetchCurrentPeriodo from '../hooks/useFetchCurrentPeriodo';

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
      <div className="relative grid grid-cols-[1fr_repeat(8,minmax(max-content,200px))_1fr] grid-rows-[100px_calc(100vh-100px)] sm:grid-rows-[80px_calc(100vh-80px)]">
        <Header />
        <SideBar />
        <div className="col-[2/10] row-2 min-h-[calc(100vh-100px)] sm:col-[3/10] sm:min-h-[calc(100vh-80px)]">
          <Outlet />
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export const LayoutContext = createContext<{ isVisible: boolean; setIsVisible: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);
