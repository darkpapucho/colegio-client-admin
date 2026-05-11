import { useQuery } from '@tanstack/react-query';
import { Nivel, Year } from '../types/enums';
import { useTypedSelector } from './useTypedSelector';
import { Pensiones } from '../models/Pensiones';
import { updateToken } from '../utils/utils';
import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useCalcularPensionesPorCobrar() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const { data, isFetching, error } = useQuery({
    queryKey: ['por-cobrar', nivel, year],
    queryFn: calcularPensionesPorCobrar,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);

  return { data, isFetching, error };
}

async function calcularPensionesPorCobrar() {
  const response = await Pensiones.calcularMontoPorCobrar();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
