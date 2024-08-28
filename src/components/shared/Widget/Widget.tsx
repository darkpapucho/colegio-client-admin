import { createContext, ReactNode, useContext, useState } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  //padding: 1rem;
  background-color: #fff;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.025);
  .tab-content {
    background-color: pink;
    width: 100%;
    padding: 1rem;
  }

  [class^='tab-content-'] {
    display: none;
  }

  /* &:has(:checked:nth-of-type(1)) [class^='tab-content-'] {
    display: block;
  } */
  &:has(:checked:nth-of-type(1)) .tab-content-1,
  &:has(:checked:nth-of-type(2)) .tab-content-2,
  &:has(:checked:nth-of-type(3)) .tab-content-3 {
    display: block;
  }
`;

const TabsContainer = styled.div<{ $numberTabs: number }>`
  width: ${({ $numberTabs }) => `${$numberTabs * 200}px`};
  display: flex;
  height: 3.5rem;
  position: relative;
  isolation: isolate;

  border-block-end: 1px solid #e9ebec;
  input {
    display: none;
  }
  label {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #656d7b;
    cursor: pointer;
    transition: color 0.5s ease-in-out;
  }
  input:checked + label {
    color: #101010;
  }
  &:has(:checked:nth-of-type(1)) {
    --active: 0;
  }
  &:has(:checked:nth-of-type(2)) {
    --active: 1;
  }
  &:has(:checked:nth-of-type(3)) {
    --active: 2;
  }
  &::after {
    pointer-events: none;
    position: absolute;
    content: '';
    z-index: -1;
    /* inset: 0; */
    inset: 0 0 -1px;
    /* width: 100%; */
    /* width: calc((100% / 3) - 2px); */
    width: calc((100% / var(--tab-count)) - 2px);
    border-radius: 0.5rem 0.5rem 0 0;
    border: 1px solid #e9ebec;
    border-block-end: none;
    background-color: ${({ theme }) => theme.colors.secondary[100]};

    /*
    1st = 0 * 100% = 0%
    2nd = 1 * 100% = 100%
    3rd = 2 * 100% = 200%
  */
    translate: calc(var(--active) * 100%);
    transition: translate 0.5s ease-in-out;
  }
`;

const WidgetContext = createContext<{ numberTabs: number; selectedTab: string; setSelectedTab: React.Dispatch<React.SetStateAction<string>> } | null>(null);

export default function Widget({ children, numberTabs }: { numberTabs: number; children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState('tab-1');
  return (
    <WidgetContext.Provider value={{ numberTabs, setSelectedTab, selectedTab }}>
      <WidgetContainer>{children}</WidgetContainer>
    </WidgetContext.Provider>
  );
}

function Tabs({ children }: { children: ReactNode }) {
  const { numberTabs } = useContext(WidgetContext)!;
  return <TabsContainer $numberTabs={numberTabs}>{children}</TabsContainer>;
}

function TabItem({ id, tabTitle }: { tabTitle: string; children: ReactNode; id: number }) {
  const { setSelectedTab } = useContext(WidgetContext)!;
  return (
    <>
      <input type="radio" name="widgets" checked onChange={() => setSelectedTab(`tab-${id}`)}></input>
      <label htmlFor={`tab-${id}`}>{tabTitle}</label>
    </>
  );
}
function Content({ children }: { children: ReactNode }) {
  return <div className="tab-content">{children}</div>;
}
function ContentItem({ children, index }: { index: number; children: ReactNode }) {
  return <div className={`tab-content-${index}`}>{children}</div>;
}
Widget.Tabs = Tabs;
Tabs.Item = TabItem;
Widget.Content = Content;
Content.Item = ContentItem;
