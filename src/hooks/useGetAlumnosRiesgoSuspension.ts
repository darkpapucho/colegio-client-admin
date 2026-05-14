import { useQuery } from '@tanstack/react-query';
import { Nivel, Year } from '../types/enums';
import { useTypedSelector } from './useTypedSelector';
import { Pensiones } from '../models/Pensiones';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useGetAlumnoRiesgoSuspension() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ['alumnos-riesgo-suspension', nivel, year],
    queryFn: getAlumnosRiesgoSuspension,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { data, isFetching, refetch };
}

export async function getAlumnosRiesgoSuspension() {
  const response = await Pensiones.getAlumnosRiesgoSuspension();
  updateToken(response);
  if (!response.data.ok) throw new Error('unable to fetch alumnos en riesgo de suspension');
  return response.data.payload;
}
