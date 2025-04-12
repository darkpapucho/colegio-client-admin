import { ReactNode } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div<{ $withBorder?: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $withBorder }) => ($withBorder ? '2px' : 0)};
`;

export default function HorizontalTable({ children, numCols }: { children: ReactNode; numCols: number }) {
  return <TableContainer>{children}</TableContainer>;
}
