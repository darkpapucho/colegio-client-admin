import { useQuery } from '@tanstack/react-query';
import { Pensiones } from '../models/Pensiones';
import { updateToken } from '../utils/utils';
import { useTypedSelector } from './useTypedSelector';
import { Nivel, Year } from '../types/enums';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function usePensionesLastUpdateDate() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año) as Year;
  const { data, isFetching, error } = useQuery({
    queryFn: fetchLastUpdateDate,
    queryKey: ['last-update-date', nivel, año],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { date: data, isFetching };
}

export async function fetchLastUpdateDate() {
  const response = await Pensiones.getLastUpdateDate();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
