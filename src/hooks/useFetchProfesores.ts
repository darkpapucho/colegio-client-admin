import { useQuery } from '@tanstack/react-query';
import { fetchProfesores } from '../components/ui/Admin/Profesores/utils';
import { Nivel, Year } from '../types/enums';
import { useTypedSelector } from './useTypedSelector';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useFetchProfesores() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año) as Year;
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ['profesores', nivel, año],
    queryFn: fetchProfesores,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 20,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [isError]);
  return { isLoading, data };
}
