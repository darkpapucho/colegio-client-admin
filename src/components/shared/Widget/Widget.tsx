import { createContext, ReactNode, useContext, useState } from 'react';

const WidgetContext = createContext<{ numberTabs: number; selectedTab: string; setSelectedTab: React.Dispatch<React.SetStateAction<string>> } | null>(null);

export default function Widget({ children, numberTabs }: { numberTabs: number; children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState('tab-1');
  return (
    <WidgetContext.Provider value={{ numberTabs, setSelectedTab, selectedTab }}>
      <div className="widget-container">{children}</div>
    </WidgetContext.Provider>
  );
}

function Tabs({ children }: { children: ReactNode }) {
  const { numberTabs } = useContext(WidgetContext)!;
  return (
    <div className="widget-tabs" style={{ width: `${numberTabs * 200}px`, ['--tab-count' as string]: numberTabs }}>
      {children}
    </div>
  );
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
