import { useQuery } from '@tanstack/react-query';
import Cursos from '../models/Cursos';
import { Grado, Seccion } from '../types/enums';
import { updateToken } from '../utils/utils';
import useGradoSeccionSearchParams from './useGradoSeccionSearchParams';
import { useTypedSelector } from './useTypedSelector';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';
import { QueryKeys } from '../config/query/query';

export default function useCursosBySalon() {
  const nivel = useTypedSelector((state) => state.nivel);
  const year = useTypedSelector((state) => state.año);
  const { grado, seccion } = useGradoSeccionSearchParams();
  const { data, error, isFetching, refetch } = useQuery({
    refetchOnWindowFocus: false,
    staleTime: 0, // 10 min
    enabled: false,
    retry: false,
    queryKey: [QueryKeys.CursosSalon, grado, seccion, nivel, year],
    queryFn: fetchCursosBySalon.bind(null, grado as Grado, seccion as Seccion),
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { data, isFetching, refetch, grado, seccion };
}

export async function fetchCursosBySalon(grado: Grado, seccion: Seccion) {
  const response = await Cursos.getCursos({ grado, seccion });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload.cursos;
}
