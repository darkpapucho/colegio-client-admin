import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledHoverable = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
`;
const StyledMessage = styled.div<{ $offset: number }>`
  position: absolute;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.indigo[100]};
  color: black;
  top: -23px;
  left: ${({ $offset }) => $offset + 'px'};
  width: max-content;
`;

export default function DisplayHoverMessage({ message, label }: { label: string; message: string }) {
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    if (!containerRef) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const width = containerRect!.width;
    setOffset(width / 2);
  }, []);
  return (
    <StyledHoverable onMouseEnter={() => setShowMessage(true)} onMouseLeave={() => setShowMessage(false)} ref={containerRef}>
      {showMessage && <StyledMessage $offset={offset}>{message}</StyledMessage>}
      {label}
    </StyledHoverable>
  );
}
