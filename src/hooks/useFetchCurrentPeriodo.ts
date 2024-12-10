import { useQuery } from '@tanstack/react-query';
import Calendario from '../models/Calendario';
import { updateToken } from '../utils/utils';
import { PeriodosKey } from '../types/documento';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useFetchCurrentPeriodo() {
  const { data, isLoading, error } = useQuery({ queryKey: ['current-periodo'], queryFn: () => fetchCurrentPeriodo(), refetchOnWindowFocus: false, retry: 5, staleTime: -1 });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { currentPeriodo: data, isLoading };
}

export async function fetchCurrentPeriodo() {
  const response = await Calendario.fetchCurrentPeriodo();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload as PeriodosKey;
}
