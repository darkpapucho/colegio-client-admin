import { useQuery } from '@tanstack/react-query';
import { Nivel, Year } from '../types/enums';
import { useTypedSelector } from './useTypedSelector';
import { Pensiones } from '../models/Pensiones';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useGetHistorialRecaudaciones() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['recaudaciones', nivel, year],
    queryFn: getHistorialRecaudaciones,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { data, isFetching, refetch };
}

export async function getHistorialRecaudaciones() {
  const response = await Pensiones.getHistorialRecaudaciones();
  updateToken(response);
  if (!response.data.ok) throw new Error('error descargando datos sobre las recaudaciones');
  return response.data.payload;
}
