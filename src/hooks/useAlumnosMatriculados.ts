import { useQuery } from '@tanstack/react-query';
import { Alumno } from '../models/alumno';
import { useTypedSelector } from './useTypedSelector';
import { Grado, Seccion } from '../types/enums';
import { AMatriculado } from '../types/alumno';
import { updateToken } from '../utils/utils';
// import { gradoSeccionSchema } from '../utils/zodSchemas';
import { assertGrado, assertSeccion } from '../utils/assert';
import { AxiosError } from 'axios';
import { useAppDispatch } from './useAppDispatch';
import { logoutUser } from '../config/redux/user/slice';
import toaster from 'react-hot-toast';
import { QueryKeys } from '../config/query/query';
export default function useAlumnosMatriculados({ grado, seccion, estados }: { grado: Grado | ''; seccion: Seccion | ''; estados: string }) {
  const dispatch = useAppDispatch();
  const año = useTypedSelector((state) => state.año);
  const {
    data: matriculados,
    status,
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.Matriculados, grado, seccion, año],
    queryFn: () => handleFetchMatriculados({ grado, seccion, estados }),
    refetchOnWindowFocus: false,
    staleTime: 0, // 10 min
    enabled: false,
    retry: false,
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toaster.error('you session has expired');
          dispatch(logoutUser());
        }
      }
    },
  });
  return { matriculados, isLoading, error, año, refetch, status, isFetching, isError };
}

export async function handleFetchMatriculados({
  grado,
  seccion,
  estados,
}: {
  grado: Grado | '';
  seccion: Seccion | '';
  estados?: string;
}): Promise<AMatriculado[]> {
  assertGrado(grado);
  assertSeccion(seccion);
  const response = await Alumno.fetchMatriculados({ grado, seccion, estados });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload.sort((old, current) => {
    return current.apellidos > old.apellidos ? -1 : 1;
  });
}
