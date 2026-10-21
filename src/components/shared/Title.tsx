export type TitleProps = {
  $cursive?: boolean;
  $center?: boolean;
  $color?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Title({ $cursive, $center, $color, className = '', style, ...rest }: TitleProps) {
  return (
    <h1
      className={`font-display text-2xl font-semibold tracking-tight break-words ${$center ? 'text-center' : ''} ${
        $cursive ? 'italic font-extralight' : 'text-slate-900'
      } ${className}`}
      style={{ color: $color, ...style }}
      {...rest}
    />
  );
}

export default Title;
