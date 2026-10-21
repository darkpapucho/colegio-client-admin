import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../Container';

export interface MultiTabsProps {
  label: string;
  url: string;
}

export default function MultiTabs({ tabs }: { tabs: MultiTabsProps[] }) {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <Container $alignItems="flex-end" $width="100%" $height="35px" $bgColor="#1a75ff" $position="relative">
      <div className="absolute bottom-0 z-0 h-1 w-full bg-brand-200"></div>
      <Container $padding="0 1rem" $width="max-content" $alignItems="flex-end" $height="27px" $direction="row" $gap="1rem">
        {tabs.map((ele, index) => {
          const isSelected = selectedItem == index;
          return (
            <NavLink
              to={ele.url}
              onClick={() => setSelectedItem(index)}
              key={index}
              className={`z-[5] flex h-[27px] items-center px-4 transition-transform duration-150 ${
                isSelected ? 'scale-110 bg-brand-200' : 'border-b-4 border-brand-200 bg-white'
              }`}
            >
              {ele.label}
            </NavLink>
          );
        })}
      </Container>
    </Container>
  );
}
