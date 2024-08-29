import { useQuery } from '@tanstack/react-query';
import Calendario from '../models/Calendario';
import { updateToken } from '../utils/utils';
import { PeriodosKey } from '../types/documento';

export default function useFetchCurrentPeriodo() {
  const { data, isLoading, error } = useQuery({ queryKey: ['current-periodo'], queryFn: () => fetchCurrentPeriodo(), refetchOnWindowFocus: false, retry: 5, staleTime: -1 });

  return { currentPeriodo: data, isLoading, error };
}

export async function fetchCurrentPeriodo() {
  const response = await Calendario.fetchCurrentPeriodo();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload as PeriodosKey;
}
