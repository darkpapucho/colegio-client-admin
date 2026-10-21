import { CSSProperties } from 'react';
import { Size } from '../../types/globals';

export type TextProps = {
  $primary?: boolean;
  $fontSize?: Size;
  $bold?: boolean;
  $width?: string;
  $textAlign?: string;
  $color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const sizeClasses: Record<Size, string> = {
  small: 'text-[13px]',
  medium: 'text-base',
  large: 'text-xl',
};

export function Text({ $primary, $fontSize, $bold, $width, $textAlign, $color, className = '', style, ...rest }: TextProps) {
  const styleObj: CSSProperties = { ...style };
  if ($width) styleObj.width = $width;
  if ($textAlign) styleObj.textAlign = $textAlign as CSSProperties['textAlign'];
  if ($color) styleObj.color = $color;

  return (
    <div
      className={`font-sans leading-snug ${$bold ? 'font-bold' : ''} ${$fontSize ? sizeClasses[$fontSize] : 'text-sm'} ${
        $primary ? 'text-brand-700' : 'text-slate-700'
      } ${className}`}
      style={styleObj}
      {...rest}
    />
  );
}

export default Text;
