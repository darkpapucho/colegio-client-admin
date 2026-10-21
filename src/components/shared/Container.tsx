import { CSSProperties, ElementType } from 'react';

export type ContainerProps = {
  $padding?: string;
  $direction?: 'row' | 'column';
  $gap?: string;
  $bgColor?: string;
  $width?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $height?: string;
  $position?: string;
  $border?: string;
  $pointer?: boolean;
  $color?: string;
  as?: ElementType;
} & React.HTMLAttributes<HTMLDivElement>;

export function Container({
  $padding,
  $direction,
  $gap,
  $bgColor,
  $width,
  $alignItems,
  $justifyContent,
  $height,
  $position,
  $border,
  $pointer,
  $color,
  as,
  className = '',
  style,
  children,
  ...rest
}: ContainerProps) {
  const Tag = (as || 'div') as ElementType;
  const styleObj: CSSProperties = {
    ...style,
    alignItems: ($alignItems || undefined) as CSSProperties['alignItems'],
    justifyContent: ($justifyContent || undefined) as CSSProperties['justifyContent'],
  };
  if ($padding) styleObj.padding = $padding;
  if ($gap) styleObj.gap = $gap;
  if ($bgColor) styleObj.backgroundColor = $bgColor;
  if ($width) styleObj.width = $width;
  if ($height) styleObj.height = $height;
  if ($position) styleObj.position = $position as CSSProperties['position'];
  if ($border) styleObj.border = $border;
  if ($color) styleObj.color = $color;

  return (
    <Tag
      className={`flex h-full ${$direction === 'column' ? 'flex-col' : 'flex-row'} ${$pointer ? 'cursor-pointer' : ''} ${className}`}
      style={styleObj}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Container;
