import { CSSProperties } from 'react';

export type IconProps = {
  $interactive?: boolean;
  $primary?: boolean;
  $small?: boolean;
  $tiny?: boolean;
  $inset?: string;
  $pointer?: boolean;
  $color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Icon({ $interactive, $primary, $small, $tiny, $inset, $pointer, $color, className = '', style, children, ...rest }: IconProps) {
  const svgStyle: CSSProperties = {};
  if ($tiny) svgStyle.fontSize = '1rem';
  if ($small) svgStyle.fontSize = '1.25rem';
  svgStyle.color = $color || ($primary ? '#0052cc' : '#475569');

  const styleObj: CSSProperties = { ...style };
  if ($inset) {
    styleObj.position = 'absolute';
    styleObj.inset = $inset;
  }

  return (
    <div
      className={`flex w-full items-center justify-center ${$pointer ? 'cursor-pointer' : ''} ${
        $interactive ? 'transition-transform hover:scale-110' : ''
      } ${className}`}
      style={styleObj}
      {...rest}
    >
      <span style={svgStyle} className="inline-flex">
        {children}
      </span>
    </div>
  );
}

export default Icon;
