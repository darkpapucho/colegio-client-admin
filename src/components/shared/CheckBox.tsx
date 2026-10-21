import { publishEvent } from '../../utils/customEvent';
import { Text } from './Text';
import { WidthCss } from '../../types/globals';
import { Icon } from './Icon';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

export default function CheckBox({ name, label, width, initialState }: { initialState: boolean; width?: WidthCss; label: string; name: string }) {
  return (
    <div
      style={{ width: width ?? '4.5rem' }}
      className="flex cursor-pointer items-center justify-between gap-[5px] transition-transform hover:scale-[1.02] active:scale-95"
      onClick={() => publish(!initialState)}
    >
      <Text $fontSize="small">{label}</Text>
      <Icon $primary $small $pointer>
        {initialState ? <FaRegCheckSquare /> : <FaRegSquare />}
      </Icon>
    </div>
  );
  function publish(value: boolean) {
    publishEvent('customCheckbox', { name, value });
  }
}
