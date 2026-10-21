import { forwardRef } from 'react';
import { WidthCss } from '../../types/globals';

type StyledInputProps = {
  $width?: WidthCss;
  $grow?: boolean;
  $pointer?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(function StyledInput({ $width, $grow, $pointer, className = '', style, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={`rounded-md bg-brand-50 px-2 py-1 font-display text-sm text-slate-800 outline-none transition-colors focus:bg-brand-100/70 disabled:cursor-not-allowed disabled:bg-slate-200 ${
        $pointer ? 'cursor-pointer' : ''
      } ${$grow ? 'flex-1 self-stretch' : ''} ${className}`}
      style={{ width: $width as string, ...style }}
      {...rest}
    />
  );
});
