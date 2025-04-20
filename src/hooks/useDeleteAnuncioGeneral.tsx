import { useMutation } from '@tanstack/react-query';
import { useTypedSelector } from './useTypedSelector';
import Anuncios from '../models/Anuncios';
import { updateToken } from '../utils/utils';
import { queryClient } from '../config/query/query';
import { AnuncioGeneral } from '../types/anuncios';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';
import toast from 'react-hot-toast';

export default function useDeleteAnuncioGeneral() {
  const nivel = useTypedSelector((state) => state.nivel)!;
  const año = useTypedSelector((state) => state.año)!;
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ['delete-anuncio-general', nivel, año],
    mutationFn: deleteAnuncioGeneral,
    onSuccess: (anuncioId: string) => {
      // queryClient.invalidateQueries({queryKey:["anuncios-generales",nivel,año]})
      const oldAnuncios = queryClient.getQueryData<AnuncioGeneral[]>(['anuncios-generales', nivel, año])!;
      queryClient.setQueryData(
        ['anuncios-generales', nivel, año],
        oldAnuncios.filter((anuncio) => anuncio._id != anuncioId),
      );
      toast.success('anuncio eliminado');
    },
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { mutate, isLoading };
}
async function deleteAnuncioGeneral(anuncioId: string) {
  const response = await Anuncios.deleteAnuncio({ anuncioId });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return anuncioId;
}
