import { forwardRef, TextareaHTMLAttributes } from 'react';

type TextAreaProps = {
  $width?: string;
  $minHeight?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ $width, $minHeight, className = '', style, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      style={{ width: $width || '100%', fieldSizing: 'content', ...style } as React.CSSProperties}
      className={`mt-4 resize-none rounded-lg border-2 border-accent-500 bg-white p-2 font-sans text-sm text-slate-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${className}`}
      {...rest}
    />
  );
});

export default TextArea;
