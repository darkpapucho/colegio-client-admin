import { Align, WidthCss } from '../../types/globals';

const alignClass = (align?: Align) => (align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left');

export const ErrMessage = ({ children, $align, $width }: { children?: React.ReactNode; $align?: Align; $width?: WidthCss }) => (
  <p className={`m-0 rounded-md bg-red-400 p-1.5 font-sans text-[11px] text-red-800 ${alignClass($align)}`} style={{ width: ($width as string) ?? '100%' }}>
    {children}
  </p>
);

export function ErrorMessage({ message, align, width }: { message: string; align?: Align; width?: WidthCss }) {
  return (
    <p className={`m-0 w-full rounded-md bg-red-400 p-1.5 font-sans text-[11px] text-red-800 ${alignClass(align)}`} style={{ width: (width as string) ?? '100%' }}>
      {message}
    </p>
  );
}
