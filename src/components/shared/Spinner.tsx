export function Spinner({ $zIndex }: { $zIndex?: number }) {
  return (
    <div className="fixed left-1/2 top-1/2 -ml-6 -mt-6" style={{ zIndex: $zIndex ? Number($zIndex) + 1 : undefined }}>
      <div className="h-12 w-12 animate-spin rounded-full border-[5px] border-white border-b-accent-500" />
    </div>
  );
}
