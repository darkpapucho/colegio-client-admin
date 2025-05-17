import { useQuery } from '@tanstack/react-query';
import Cursos from '../models/Cursos';
import { Grado, Nivel, Seccion, Year } from '../types/enums';
import { updateToken } from '../utils/utils';
import { useTypedSelector } from './useTypedSelector';
import { useEffect, useState } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useCursosSelectOptions({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { data, isFetching, error } = useQuery({
    queryKey: ['cursos-salon', grado, seccion, nivel, year],
    queryFn: () => fetchCursosSalon({ grado, seccion }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const [cursosOptions, setCursosOptions] = useState<
    { label: string; value: { key: string; label: string; code: string; short: string; salon: string } }[] | undefined
  >(undefined);

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  useEffect(() => {
    if (!data) return;
    const options = data.map((record) => {
      return { label: record.label, value: { ...record, salon: `${grado} ${seccion}` } };
    });
    setCursosOptions(options);
  }, [data]);
  return { cursosOptions, isFetching };
}

async function fetchCursosSalon({ grado, seccion }) {
  const response = await Cursos.getCursos({ grado, seccion });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload.cursos;
}
