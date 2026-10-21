export const StyledErrorPageMessage = ({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`absolute left-[20%] top-[30%] ${className}`} style={style}>
    {children}
  </div>
);

export default function ErrorPageMessage({ message }: { message: string }) {
  return (
    <div className="absolute left-[20%] top-[30%]">
      <h1 className="w-[30rem] font-mono text-4xl text-slate-800">{message}</h1>
    </div>
  );
}
