import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AsistenciasReducerState } from '../components/ui/Admin/PasarAsistencia/AsistenciasReducer';
import { queryClient } from '../config/query/query';
import toaster from 'react-hot-toast';
import { errorHandler } from '../utils/errorHandler';
import { AsistenciaValue } from '../components/ui/Admin/RegistroAsistenciaAlumnos/types';
import { fetchAsistenciaListByGradoSeccionDayId } from './useAsistenciaListByGradoSeccion';
import Calendario from '../models/Calendario';
import { updateToken } from '../utils/utils';
import { Year } from '../types/enums';
import { MONTHS } from '../components/ui/Admin/Calendario/EnableDays/utils';

export type AsistenciaList = {
  dayId: string;
  day: number;
  month: string;
  list: { alumnoId: string; asistencia: AsistenciaValue }[];
};

export default function useUpdateAsistenciaList({
  searchParams,
  month,
  dayId,
  year,
  registroAsistencia,
  day,
}: {
  year: Year;
  searchParams: URLSearchParams;
  registroAsistencia: AsistenciasReducerState;
  month: string | undefined;
  dayId: string | undefined;
  day: number | undefined;
}) {
  const grado = searchParams.get('grado');
  const seccion = searchParams.get('seccion');
  const estadosMatriculaString = searchParams.get('estadosMatricula');
  const estadosMatricula = estadosMatriculaString ? estadosMatriculaString.split('-') : undefined;
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ['update-asistencia', grado, seccion, dayId],
    mutationFn: () => updateAsistenciaList({ registroAsistencia, dayId, day, month, year }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pasar-asistencia-list', grado, seccion, month, dayId, estadosMatriculaString] });
      queryClient.prefetchQuery({
        queryKey: ['pasar-asistencia-list', grado, seccion, month, dayId, estadosMatriculaString],
        queryFn: () => fetchAsistenciaListByGradoSeccionDayId({ grado, seccion, month, dayId, estadosMatricula }),
      });
    },
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { mutate, isLoading };
}

export async function updateAsistenciaList({
  registroAsistencia,
  dayId,
  day,
  month,
  year,
}: {
  year: Year;
  dayId: string | undefined;
  day: number | undefined;
  month: string | undefined;
  registroAsistencia: AsistenciasReducerState;
}) {
  if (!month || !dayId || !day) throw new Error('invalid request params');
  const asistenciaList: AsistenciaList = {
    dayId,
    day,
    month,
    //eliminar nombreCompleto de los records
    list: registroAsistencia.map((record) => ({ alumnoId: record.alumnoId, asistencia: record.asistencia })),
  };
  const totalFaltas: number = asistenciaList.list.filter((record) => record.asistencia === 'F').length;
  const totalTardanzas: number = asistenciaList.list.filter((record) => record.asistencia === 'T').length;
  if (
    !window.confirm(
      `Estas seguro que deseas alterar la asistencia del ${new Date(`${year}-${MONTHS.findIndex((element) => element === month) + 1}-${day}`).toLocaleDateString('ES-es', {
        day: '2-digit',
        month: 'long',
      })}
      Faltas: ${totalFaltas}
      Tardanzas: ${totalTardanzas}
      `,
    )
  )
    return;
  const response = await Calendario.updateAsistenciaList({ asistenciaList });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  toaster.success('Se guardó la lista de asistencia');
}
