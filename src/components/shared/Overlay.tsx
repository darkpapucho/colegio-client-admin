export function Overlay({ $zIndex, children, className = '' }: { $zIndex?: number; children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={`fixed inset-0 bg-gradient-to-b from-black/50 to-black/30 ${className}`}
      style={{ zIndex: $zIndex ? $zIndex : 100 }}
    >
      {children}
    </div>
  );
}
