import { useEffect } from 'react';
import Cursos from '../models/Cursos';
import { Nivel } from '../types/enums';
import { errorHandler } from '../utils/errorHandler';
import { updateToken } from '../utils/utils';
import { useTypedSelector } from './useTypedSelector';
import { useQuery } from '@tanstack/react-query';
import { CURSO_NIVEL } from '../types/cursos/types';

export default function useCursosByNivel() {
  async function fetchCursos() {
    const response = await Cursos.fetchCursosByNivel();
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload as CURSO_NIVEL[];
  }
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const {
    data: cursos,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['cursos', nivel],
    queryFn: fetchCursos,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  });
  return { cursos, isFetching };
}
