import { CSSProperties } from 'react';

export type GridContainerProps = {
  $width: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function GridContainer({ $width, className = '', style, children, ...rest }: GridContainerProps) {
  const styleObj: CSSProperties = {
    ...style,
    width: $width,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 185px)',
    rowGap: '0.5rem',
  };
  return (
    <div className={className} style={styleObj} {...rest}>
      {children}
    </div>
  );
}

export default GridContainer;
