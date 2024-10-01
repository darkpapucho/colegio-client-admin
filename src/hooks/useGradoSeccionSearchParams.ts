import { useSearchParams } from 'react-router-dom';
import { Grado, Nivel, Seccion } from '../types/enums';
import useCustomEvent from './useCustomEvent';
import { useEffect } from 'react';
import { grados, SECCIONES_SELECT_OPTIONS } from '../utils/var';
import { useTypedSelector } from './useTypedSelector';

export default function useGradoSeccionSearchParams() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [searchParams, setSearchParams] = useSearchParams();
  const grado = (searchParams.get('grado') as Grado) || '';
  const seccion = (searchParams.get('seccion') as Seccion) || '';
  // assertGrado(grado);
  // assertSeccion(seccion);
  useCustomEvent('customSelect', listener);
  useEffect(() => {
    setSearchParams((previous) => {
      previous.set('grado', grados[nivel][0].value);
      previous.set('seccion', SECCIONES_SELECT_OPTIONS[0].value);
      return previous;
    });
  }, []);
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
