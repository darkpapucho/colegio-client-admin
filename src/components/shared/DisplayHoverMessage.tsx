import { ReactNode, useEffect, useRef, useState } from 'react';
import { WidthCss } from '../../types/globals';
import { Text } from './Text';

export default function DisplayHoverMessage({
  message,
  label,
  bgColor,
  padding,
  width,
  color,
}: {
  width?: WidthCss;
  padding?: string;
  bgColor?: string;
  label: ReactNode;
  message: string;
  color?: string;
}) {
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    if (!containerRef) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const width = containerRect!.width;
    setOffset(width / 2);
  }, []);
  return (
    <div
      style={{ width: (width as string) || '100%', backgroundColor: bgColor, padding }}
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
      ref={containerRef}
      className="relative flex items-center justify-center text-center"
    >
      {showMessage && (
        <div className="absolute -top-[23px] z-[100] w-max p-1 bg-brand-100 text-black" style={{ left: offset + 'px' }}>
          {message}
        </div>
      )}
      <Text $fontSize="small" $color={color}>
        {label}
      </Text>
    </div>
  );
}
