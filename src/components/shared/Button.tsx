import { forwardRef, CSSProperties } from 'react';

export type ButtonProps = {
  $primary?: boolean;
  $secondary?: boolean;
  $medium?: boolean;
  $large?: boolean;
  $small?: boolean;
  $danger?: boolean;
  $width?: string;
  $green?: boolean;
  $padding?: string;
  $center?: boolean;
  $height?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  'inline-flex items-center gap-2 rounded-lg border px-[1.1rem] py-[0.6rem] font-display font-medium text-sm transition-all duration-150 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-300 active:scale-[0.98] ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

const variations: Record<string, string> = {
  default: 'border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-100',
  primary: 'border-transparent bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  secondary: 'border-brand-200 bg-white text-brand-700 hover:bg-brand-50',
  danger: 'border-transparent bg-red-600 text-white shadow-sm hover:bg-red-700',
  green: 'border-transparent bg-green-600 text-white shadow-sm hover:bg-green-700',
};

const sizes: Record<string, string> = {
  small: 'text-[13px] px-2.5 py-1 capitalize',
  medium: 'text-base px-4 py-2',
  large: 'text-xl px-6 py-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { $primary, $secondary, $medium, $large, $small, $danger, $width, $green, $padding, $center, $height, className = '', style, children, ...rest },
  ref,
) {
  const variation = $primary ? 'primary' : $secondary ? 'secondary' : $danger ? 'danger' : $green ? 'green' : 'default';
  const size = $large ? sizes.large : $small ? sizes.small : $medium ? sizes.medium : '';

  const styleObj: CSSProperties = { ...style };
  if ($width) styleObj.width = $width;
  if ($height) styleObj.height = $height;
  if ($padding) styleObj.padding = $padding;

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variations[variation]} ${size} ${$center ? 'justify-center' : 'justify-between'} ${className}`}
      style={styleObj}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
