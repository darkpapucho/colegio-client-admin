export const Form = ({ children, className = '', ...rest }: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form className={`flex w-full flex-col justify-start gap-10 ${className}`} {...rest}>
    {children}
  </form>
);
