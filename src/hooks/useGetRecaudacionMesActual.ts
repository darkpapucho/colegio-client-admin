import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from './useTypedSelector';
import { Nivel, Year } from '../types/enums';
import { Pensiones } from '../models/Pensiones';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function GetRecaudacionMesActual() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['recaudacion', nivel, year],
    queryFn: getRecaudacionMesActual,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);

  return { data, isFetching, error, refetch };
}

export async function getRecaudacionMesActual() {
  const response = await Pensiones.getRecaudacionMesActual();
  updateToken(response);
  if (!response.data.ok) throw new Error('error al descargar el total recaudado durante el mes actual');
  return response.data.payload;
}
