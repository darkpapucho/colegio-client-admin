import { useMutation } from '@tanstack/react-query';
import { Grado, Nivel, Seccion, Year } from '../types/enums';
import useGradoSeccionSearchParams from './useGradoSeccionSearchParams';
import { useTypedSelector } from './useTypedSelector';
import Cursos from '../models/Cursos';
import { CURSO } from '../types/cursos/types';
import { queryClient, QueryKeys } from '../config/query/query';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useUpdateCursosSalon(cursos: CURSO[] | null) {
  const { grado, seccion } = useGradoSeccionSearchParams();
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { mutate, isLoading, error, data } = useMutation<CURSO[] | null, unknown, { cursos: CURSO[] | null; grado: Grado; seccion: Seccion }>({
    mutationKey: ['cursos', grado, seccion, nivel, year],
    mutationFn: updateCursosSalon,
    onSuccess: (_data, { cursos, grado, seccion }) => {
      //   queryClient.invalidateQueries({ queryKey: ['cursos', grado, seccion, nivel, year] });
      queryClient.setQueryData([QueryKeys.CursosSalon, grado, seccion, nivel, year], () => {
        return cursos;
      });
      //   queryClient.prefetchQuery({
      //     queryKey: ['cursos', grado, seccion, nivel, year],
      //     queryFn: fetchCursosBySalon.bind(null, grado as Grado, seccion as Seccion),
      //   });
    },
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { mutate: mutate.bind(null, { cursos, grado: grado as Grado, seccion: seccion as Seccion }), isLoading, data };
}

async function updateCursosSalon({ cursos, grado, seccion }: { cursos: CURSO[] | null; grado: Grado; seccion: Seccion }) {
  if (!cursos) throw new Error('cursos cant be null');
  const response = await Cursos.updateCursos({ cursos, grado, seccion });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);

  return cursos;
}
