import { createContext, ReactNode, useContext } from 'react';
import { WidthCss } from '../../../types/globals';

const TableContext = createContext<{ gridTemplateColumns: string; width: string; withBorder?: boolean } | null>(null);

const rowClasses = (withBorder?: boolean) => `grid ${withBorder ? 'gap-0.5' : ''}`;

function TableBase({ children, gridTemplateColumns, width, withBorder }: { withBorder?: boolean; children: ReactNode; gridTemplateColumns: string; width: WidthCss }) {
  return (
    <TableContext.Provider value={{ gridTemplateColumns, width, withBorder }}>
      <div className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card ${withBorder ? 'gap-0.5' : ''}`}>{children}</div>
    </TableContext.Provider>
  );
}
function TableHeader({ children }: { children: ReactNode }) {
  const { width, gridTemplateColumns, withBorder } = useContext(TableContext)!;
  return (
    <div className={`${rowClasses(withBorder)} rounded-t-xl`} style={{ width, gridTemplateColumns }}>
      {children}
    </div>
  );
}
function TableBody({ children }: { children: ReactNode }) {
  const { width, gridTemplateColumns, withBorder } = useContext(TableContext)!;
  return (
    <div className={`${rowClasses(withBorder)} rounded-b-xl border-b border-slate-200 transition-colors duration-100 last:border-b-0 hover:bg-brand-50`} style={{ width, gridTemplateColumns }}>
      {children}
    </div>
  );
}
function HeaderItem({ children, $padding, className = '', ...rest }: { $padding?: string; children?: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex w-full items-center justify-center bg-gradient-to-r from-brand-700 to-brand-600 p-0 text-center font-display font-semibold text-white capitalize ${className}`}
      style={{ padding: $padding }}
      {...rest}
    >
      {children}
    </div>
  );
}
function BodyItem({ children, $key = 0, $align, $padding, className = '', ...rest }: { $key?: number; $align?: string; $padding?: string; children?: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex w-full items-center justify-center p-0 text-center text-slate-800 transition-colors duration-100 ${$key % 2 === 0 ? 'bg-white' : 'bg-slate-100'} ${className}`}
      style={{ padding: $padding, justifyContent: $align }}
      {...rest}
    >
      {children}
    </div>
  );
}

const TableHeaderWithItem = Object.assign(TableHeader, { Item: HeaderItem });
const TableBodyWithItem = Object.assign(TableBody, { Item: BodyItem });
const Table = Object.assign(TableBase, { Header: TableHeaderWithItem, Body: TableBodyWithItem });

export default Table;
