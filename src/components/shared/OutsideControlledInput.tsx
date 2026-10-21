import { RefObject, forwardRef, useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Icon } from './Icon';

//main input component
const OutsideControlledInput = forwardRef(function InputComponent(
  {
    name,
    type,
    $width,
    label,
    isError,
    value,
    setValue,
  }: { value: string | number; setValue: React.Dispatch<React.SetStateAction<string>>; $width?: string; name: string; type: string; label: string; isError?: boolean },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    if (value !== '') {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [value]);

  const isDate = type === 'date';

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`font-display text-sm italic text-slate-500 transition-all duration-500 ${
          isDate ? 'relative block' : `absolute left-[5px] ${hasContent ? '-top-5' : 'top-0'}`
        } ${isError && hasContent ? 'text-red-600' : ''}`}
      >
        {label}
      </label>
      <input
        id={name}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref as RefObject<HTMLInputElement>}
        className={`h-[3rem] w-full border-0 pl-[5px] font-sans text-sm text-slate-800 outline-none transition-all [color-scheme:light] ${
          isDate
            ? 'bg-transparent'
            : isError
              ? 'border-b-2 border-red-500 focus:border-b-[3px] focus:border-red-600'
              : 'border-b-2 border-slate-400 focus:border-b-[3px] focus:border-brand-700'
        }`}
      />
      {type === 'password' &&
        (showPassword ? (
          <Icon $small $inset="2px 2px 30% 90%">
            <HiOutlineEyeOff onClick={() => setShowPassword((old) => !old)} />
          </Icon>
        ) : (
          <Icon $small $inset="2px 2px 30% 90%">
            <HiOutlineEye onClick={() => setShowPassword((old) => !old)} />
          </Icon>
        ))}
    </div>
  );
});
export default OutsideControlledInput;
