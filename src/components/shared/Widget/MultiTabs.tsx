import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../../config/styled/styled';
import { Container } from '../Container';

const Tab = styled(NavLink)<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? `${theme.colors.secondary[200]}` : 'white')};
  align-self: center;
  box-sizing: border-box;
  transform-origin: bottom;
  height: 27px;
  transform: scale(${({ $isSelected }) => ($isSelected ? '1.1' : '1')});
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: ${({ $isSelected }) => ($isSelected ? 'none' : `4px solid ${theme.colors.secondary[200]}`)};
  z-index: 5;
`;
const Line = styled.div`
  width: 100%;
  background-color: ${theme.colors.secondary[200]};
  position: absolute;
  height: 4px;
  bottom: 0;
  z-index: 0;
`;
export default function MultiTabs({ tabs }: { tabs: { label: string; url: string }[] }) {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <Container $alignItems="flex-end" $width="100%" $height="35px" $bgColor={theme.colors.secondary[500]} $position="relative">
      <Line></Line>
      <Container $padding="0 1rem" $width="max-content" $alignItems="flex-end" $height="27px" $direction="row" $gap="1rem">
        {tabs.map((ele, index) => {
          return (
            <Tab to={ele.url} onClick={() => setSelectedItem(index)} key={index} $isSelected={selectedItem == index}>
              {ele.label}
            </Tab>
          );
        })}
      </Container>
    </Container>
  );
}
