import { Overlay } from '../../shared/Overlay';
import { Spinner } from '../../shared/Spinner';

export default function Loader({ $zIndex }: { $zIndex?: number }) {
  return (
    <>
      <Overlay $zIndex={$zIndex} />
      <Spinner $zIndex={$zIndex} />
    </>
  );
}
