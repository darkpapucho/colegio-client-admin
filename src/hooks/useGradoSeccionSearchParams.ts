import { useSearchParams } from 'react-router-dom';
import { Grado, Seccion } from '../types/enums';
import useCustomEvent from './useCustomEvent';

export default function useGradoSeccionSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const grado = (searchParams.get('grado') as Grado) || '';
  const seccion = (searchParams.get('seccion') as Seccion) || '';
  // assertGrado(grado);
  // assertSeccion(seccion);
  useCustomEvent('customSelect', listener);
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'grado') {
      setSearchParams((prev) => {
        prev.set('grado', value);
        return prev;
      });
    } else if (name === 'seccion') {
      setSearchParams((previous) => {
        previous.set('seccion', value);
        return previous;
      });
    }
  }
  return { searchParams, setSearchParams, grado, seccion };
}
