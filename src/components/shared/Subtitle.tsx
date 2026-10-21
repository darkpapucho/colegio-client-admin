export type SubtitleProps = {
  $cursive?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Subtitle({ $cursive, className = '', ...rest }: SubtitleProps) {
  return (
    <h2
      className={`font-display text-sm font-medium tracking-wide text-slate-600 ${$cursive ? 'italic' : ''} ${className}`}
      {...rest}
    />
  );
}

export default Subtitle;
