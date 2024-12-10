import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';
import { Alumno } from '../models/alumno';
import { PeriodosKey } from '../types/documento';
import { updateToken } from '../utils/utils';
import { useTypedSelector } from './useTypedSelector';
import { Nivel } from '../types/enums';

export function useResumenTardanzasList(periodo: PeriodosKey | undefined) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [`resumen-tardanzas-${periodo}-${nivel}`],
    queryFn: () => fetchTardanzasList(periodo),
    enabled: periodo != undefined,
  });

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);

  return { data, isFetching, refetch };
}
async function fetchTardanzasList(periodo: PeriodosKey | undefined) {
  if (!periodo) throw new Error('periovo was not provided');
  const response = await Alumno.getListaMasTardonesByPeriodo({ periodo });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
