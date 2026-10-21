export const ErrorPage = ({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`relative h-full w-full bg-[url('/error-robot.png')] bg-right bg-no-repeat bg-contain ${className}`} style={style}>
    {children}
  </div>
);
