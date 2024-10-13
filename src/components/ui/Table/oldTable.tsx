// import { createContext, ReactNode, useContext } from 'react';
// import styled, { css } from 'styled-components';
// import { WidthCss } from '../../../types/globals';

// const TableContainer = styled.div<{ $withBorder?: boolean }>`
//   margin: 0;
//   padding: 0;
//   display: flex;
//   flex-direction: column;
//   gap: ${({ $withBorder }) => ($withBorder ? '2px' : 0)};
// `;

// const StyledTableRow = styled.div<{ $gridTemplateColumns: string; $width: string; $withBorder?: boolean }>`
//   display: grid;
//   width: ${({ $width }) => $width};
//   grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
//   gap: ${({ $withBorder }) => ($withBorder ? '2px' : 0)};
// `;

// const StyledHeader = styled(StyledTableRow)`
//   border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
//   border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
// `;
// const StyledBody = styled(StyledTableRow)`
//   border-bottom-left-radius: ${({ theme }) => theme.borderRadius.lg};
//   border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
//   gap: ${({ $withBorder }) => ($withBorder ? '2px' : 0)};
// `;
// const StyledTableItem = styled.div<{ $padding?: string }>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   padding: ${({ $padding }) => $padding || 0};
//   text-align: center;
// `;
// const HeaderItem = styled(StyledTableItem)`
//   background-color: ${({ theme }) => theme.colors.secondary[600]};
//   color: ${({ theme }) => theme.colors.tertiary[100]};
//   width: 100%;
// `;
// const BodyItem = styled(StyledTableItem)<{ $key: number; $align?: string }>`
//   background-color: ${({ $key, theme }) => {
//     return $key % 2 === 0 ? theme.colors.tertiary[400] : theme.colors.tertiary[200];
//   }};
//   ${({ $align }) =>
//     $align &&
//     css`
//       justify-content: ${$align};
//     `}
//   color: ${({ theme }) => theme.colors.tertiary[800]};
// `;
// const TableContext = createContext<{ gridTemplateColumns: string; width: string; withBorder?: boolean } | null>(null);

// export default function Table({ children, gridTemplateColumns, width, withBorder }: { withBorder?: boolean; children: ReactNode; gridTemplateColumns: string; width: WidthCss }) {
//   return (
//     <TableContext.Provider value={{ gridTemplateColumns, width, withBorder }}>
//       <TableContainer $withBorder={withBorder}> {children}</TableContainer>
//     </TableContext.Provider>
//   );
// }
// function TableHeader({ children }: { children: ReactNode }) {
//   const { width, gridTemplateColumns, withBorder } = useContext(TableContext)!;
//   return (
//     <StyledHeader $withBorder={withBorder} $width={width} $gridTemplateColumns={gridTemplateColumns}>
//       {children}
//     </StyledHeader>
//   );
// }
// function TableBody({ children }: { children: ReactNode }) {
//   const { width, gridTemplateColumns, withBorder } = useContext(TableContext)!;
//   return (
//     <StyledBody $withBorder={withBorder} $width={width} $gridTemplateColumns={gridTemplateColumns}>
//       {children}
//     </StyledBody>
//   );
// }
// Table.Header = TableHeader;
// TableHeader.Item = HeaderItem;
// Table.Body = TableBody;
// TableBody.Item = BodyItem;
