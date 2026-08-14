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

  const { grado, seccion, searchParams } = useGradoSeccionSearchParams();
  const mes = Number(searchParams.get('mes')) || new Date().getMonth();

  const { isFetching, error, refetch, data } = useQuery({
    queryKey: ['pensiones-atrasados', nivel, grado, seccion, mes],
    queryFn: fetchAtrasados.bind(null, grado, seccion, mes),
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

export async function fetchAtrasados(grado: Grado | '', seccion: Seccion | '', mes: number | null) {
  if (!grado || !seccion || !mes) throw new Error('Grado, sección y mes son requeridos');
  const response = await Pensiones.fetchAtrasadosList({ grado: grado as Grado, seccion: seccion as Seccion, mes });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);

  return response.data.payload;
}
