export const Image = ({ $width, $ratio, style, className = '', ...rest }: { $width?: string; $ratio?: string } & React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img className={`object-contain object-center ${className}`} style={{ width: $width || 'fit-content', aspectRatio: $ratio, ...style }} {...rest} />
);
