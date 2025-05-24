import { useQuery } from '@tanstack/react-query';
import Calendario from '../models/Calendario';
import { updateToken } from '../utils/utils';
import { PeriodosKey } from '../types/documento';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';
import { useTypedSelector } from './useTypedSelector';
import { Nivel, Year } from '../types/enums';

export default function useFetchCurrentPeriodo() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['current-periodo', nivel, year],
    queryFn: () => fetchCurrentPeriodo(),
    refetchOnWindowFocus: false,
    retry: 5,
    staleTime: -1,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { currentPeriodo: data, isLoading: isLoading || isFetching };
}

export async function fetchCurrentPeriodo() {
  const response = await Calendario.fetchCurrentPeriodo();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload as PeriodosKey;
}
