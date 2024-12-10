import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';
import useFetchCurrentPeriodo from './useFetchCurrentPeriodo';
import { Alumno } from '../models/alumno';
import { PeriodosKey } from '../types/documento';
import { updateToken } from '../utils/utils';
import { useTypedSelector } from './useTypedSelector';
import { Nivel } from '../types/enums';

export function useResumenTardanzasList() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { currentPeriodo, isLoading } = useFetchCurrentPeriodo();
  const {
    data: list,
    isFetching,
    error,
  } = useQuery({
    queryKey: [`resumen-tardanzas-${currentPeriodo}-${nivel}`],
    queryFn: () => fetchTardanzasList(currentPeriodo),
    enabled: currentPeriodo != undefined,
  });

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);

  return { list, isFetching, isLoading };
}
async function fetchTardanzasList(periodo: PeriodosKey | undefined) {
  if (!periodo) throw new Error('periovo was not provided');
  const response = await Alumno.getListaMasTardonesByPeriodo({ periodo });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
