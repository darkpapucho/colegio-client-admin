import { useQuery } from '@tanstack/react-query';
import { store } from '../config/redux/store';
import Calendario from '../models/Calendario';
import { updateToken } from '../utils/utils';

export default function useCalendarioEscolar() {
  const nivel = store.getState().nivel;
  const year = store.getState().año;
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['calendario-escolar', nivel, year],
    queryFn: () => fetchCalendario(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isFetching, error, refetch };
}

export async function fetchCalendario() {
  const response = await Calendario.fetchCalendario();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
