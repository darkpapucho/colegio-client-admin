import { useSearchParams } from 'react-router-dom';
import Select from '../../shared/Select';
import useCustomEvent from '../../../hooks/useCustomEvent';

export default function Filter<T>({
  options,
  name,
  label,
  width,
  defaultValue,
}: {
  defaultValue?: { label: string; value: T };
  options: { label: string; value: T }[];
  name: string;
  label: string;
  width: string;
}) {
  const [_, setSearchParams] = useSearchParams();
  useCustomEvent('customSelect', listener);

  return <Select options={options} name={name} label={label} tiny width={width} defaultValue={defaultValue}></Select>;

  function listener(event: CustomEvent) {
    const { name: eventName, value } = event.detail;
    if (eventName === name) {
      // searchParams.set(eventName, value);
      setSearchParams((prev) => {
        console.log({ prev });
        prev.set(name, value);
        return prev;
      });
    }
  }
}
