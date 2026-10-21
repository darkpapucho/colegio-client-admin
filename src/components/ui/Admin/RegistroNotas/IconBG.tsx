import { HTMLAttributes } from 'react';

type IconBGProps = {
  $isCompleted: boolean;
  $pointer?: boolean;
  $small?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const IconBG = ({ $isCompleted, $pointer, $small, className = '', children, ...rest }: IconBGProps) => (
  <div
    {...rest}
    className={`flex items-center justify-center text-[1.4rem] transition-all hover:scale-105 ${
      $isCompleted ? 'text-green-700 hover:text-green-500' : 'text-red-700 hover:text-red-500'
    } ${className}`}>
    <span className="inline-flex">{children}</span>
  </div>
);

export default IconBG;
