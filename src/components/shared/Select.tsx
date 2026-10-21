import { useState } from 'react';
import { publishEvent } from '../../utils/customEvent';
import useClickOutside from '../../hooks/useClickOutside';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Icon } from './Icon';

const sizeClass = (small?: boolean, tiny?: boolean) => (tiny ? 'p-1' : small ? 'p-2' : 'p-3');

//#MAIN FUNCTIONAL COMPONENT

interface SelectProps<T> {
  width?: string;
  name: string;
  options: { label: string; value: T }[];
  defaultValue?: { label: string; value: T | null };
  small?: boolean;
  tiny?: boolean;
  label: string;
  height?: string;
  bgColor?: string;
  rect?: boolean;
}
export default function Select<T>({ name, label, options, width, defaultValue, small, tiny, bgColor, height, rect }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: T | null }>(defaultValue ? defaultValue : { label: label, value: null });
  const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  function toggle() {
    setIsOpen((old) => !old);
  }

  return (
    <div
      ref={ref}
      style={{ width, height }}
      className={`relative max-h-fit cursor-pointer bg-white font-display text-slate-800 shadow-card transition-all duration-150 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 ${
        rect ? 'border-[1.5px] border-slate-300 rounded-none' : 'border-[1.5px] border-slate-300 rounded-lg'
      } ${tiny ? 'text-[11px]' : small ? 'text-sm' : 'text-base'} px-1.5`}
    >
      <div
        onClick={() => toggle()}
        style={{ backgroundColor: bgColor }}
        className={`flex items-center justify-between gap-2 rounded-md ${sizeClass(small, tiny)}`}
      >
        {selectedOption.label}
        {isOpen ? (
          <Icon $tiny>
            <BsChevronUp />
          </Icon>
        ) : (
          <Icon $tiny>
            <BsChevronDown />
          </Icon>
        )}
      </div>
      <div
        className={`absolute left-0 top-[calc(100%+0.4rem)] z-10 w-full flex-col items-start overflow-auto rounded-lg border border-slate-200 bg-white shadow-lift ${
          isOpen ? 'flex' : 'hidden'
        }`}
        style={{ maxHeight: '22rem' }}
      >
        {options.map((option) => {
          return (
            <div key={option.label} onClick={() => handleClick(option)} className={`w-full cursor-pointer bg-transparent font-sans text-slate-700 transition-colors duration-100 hover:bg-brand-50 hover:text-brand-800 ${sizeClass(small, tiny)}`}>
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
  function handleClick(option: { label: string; value: T }) {
    setSelectedOption(option);
    publishEvent<T>('customSelect', { name, value: option.value });
    setIsOpen(false);
  }
}
