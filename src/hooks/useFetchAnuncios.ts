import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from './useTypedSelector';
import Anuncios from '../models/Anuncios';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useFetchAnuncios() {
  const nivel = useTypedSelector((state) => state.nivel)!;
  const año = useTypedSelector((state) => state.año)!;
  const { data, isFetching, error } = useQuery({
    queryKey: ['anuncios-generales', nivel, año],
    enabled: true,
    queryFn: fetchAnunciosGenerales,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { data, isFetching };
}
async function fetchAnunciosGenerales() {
  const response = await Anuncios.fetchAnuncios();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
