import { forwardRef, useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Icon } from './Icon';

type InputProps = {
  $width?: string;
  name: string;
  type: string;
  label: string;
  isError?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export default forwardRef(function InputComponent(props: InputProps, ref) {
  const { $width, name, type, label, isError, defaultValue, className = '', ...rest } = props;
  const [value, setValue] = useState(defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    setHasContent(value !== '');
  }, [value]);

  const isDate = type === 'date' || type === 'datetime-local';

  return (
    <div
      className={`relative w-full rounded-lg border-[1.5px] bg-white transition-all duration-150 ${
        isError ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-200' : 'border-slate-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200'
      } ${className}`}
    >
      <label
        htmlFor={name}
        className={`pointer-events-none absolute font-display text-sm text-slate-400 transition-all duration-200 ${
          isDate
            ? 'top-1 left-2.5'
            : hasContent
              ? 'top-1 left-2.5 text-[11px] text-slate-500'
              : 'top-3.5 left-2.5'
        } ${isError && hasContent ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      <input
        {...rest}
        ref={ref as React.Ref<HTMLInputElement>}
        id={name}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 w-full bg-transparent px-3 pt-5 pb-1 text-sm font-sans text-slate-800 outline-none placeholder:text-slate-400 [color-scheme:light]"
      />
      {type === 'password' && (
        <span className="absolute top-1/2 right-2.5 flex -translate-y-1/2 cursor-pointer text-lg text-slate-500 hover:text-brand-700">
          {showPassword ? <HiOutlineEyeOff onClick={() => setShowPassword((old) => !old)} /> : <HiOutlineEye onClick={() => setShowPassword((old) => !old)} />}
        </span>
      )}
    </div>
  );
});
