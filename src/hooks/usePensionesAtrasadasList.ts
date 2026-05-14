import { useQuery } from '@tanstack/react-query';
import { Grado, Nivel, Seccion } from '../types/enums';
import useGradoSeccionSearchParams from './useGradoSeccionSearchParams';
import { useTypedSelector } from './useTypedSelector';
import { Pensiones } from '../models/Pensiones';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function usePensionesAtrasadasList() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;

  const { grado, seccion, setSearchParams } = useGradoSeccionSearchParams();
  const { isFetching, error, refetch, data } = useQuery({
    queryKey: ['pensiones-atrasados', nivel, grado, seccion],
    queryFn: fetchAtrasados.bind(null, grado, seccion),
    enabled: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!error) return;
    if (error) {
      errorHandler(error);
    }
  }, [error]);
  return { isFetching, refetch, data };
}

export async function fetchAtrasados(grado: Grado | '', seccion: Seccion | '') {
  if (!grado || !seccion) throw new Error('Grado y sección son requeridos');
  const response = await Pensiones.fetchAtrasadosList({ grado: grado as Grado, seccion: seccion as Seccion });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);

  return response.data.payload;
}
