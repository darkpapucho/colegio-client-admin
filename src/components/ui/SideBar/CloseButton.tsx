import { IoClose } from 'react-icons/io5';
import { Icon } from '../../shared/Icon';

export default function CloseButton({ action }: { action: () => void }) {
  return (
    <div id="CloseMenuButton" onClick={() => action()} className="absolute top-[150px] -right-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white shadow-card transition-transform hover:scale-105 sm:hidden">
      <Icon $color="#0052cc" $small $pointer>
        <IoClose />
      </Icon>
    </div>
  );
}
