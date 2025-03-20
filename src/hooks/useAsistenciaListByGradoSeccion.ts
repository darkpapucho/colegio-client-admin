import { useQuery } from '@tanstack/react-query';
import Calendario from '../models/Calendario';
import { errorHandler } from '../utils/errorHandler';
import { updateToken } from '../utils/utils';
import { MONTH_NAME } from '../types/enums';
import { useEffect } from 'react';

export default function useFetchAsistenciaList({
  month,
  dayId,

  searchParams,
}: {
  searchParams: URLSearchParams;
  month: MONTH_NAME | undefined;

  dayId: string | undefined;
}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['pasar-asistencia-list', searchParams.get('grado'), searchParams.get('seccion'), month, dayId, searchParams.get('estadosMatricula')],
    queryFn: () =>
      fetchAsistenciaListByGradoSeccionDayId({
        grado: searchParams.get('grado'),
        seccion: searchParams.get('seccion'),
        dayId,
        month,
        estadosMatricula: searchParams.get('estadosMatricula')?.split('-'),
      }),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { data, isLoading, refetch };
}

export async function fetchAsistenciaListByGradoSeccionDayId({ grado, seccion, month, dayId, estadosMatricula }) {
  try {
    if (!grado || !seccion || !month || !dayId || !estadosMatricula || estadosMatricula.length == 0) throw new Error('invalid request data');

    const response = await Calendario.fetchAsistenciaListByGradoSeccionDayId({ grado, seccion, month, dayId, estadosMatricula });

    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  } catch (err) {
    errorHandler(err);
  }
}
