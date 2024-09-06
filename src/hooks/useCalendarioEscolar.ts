import { useQuery } from '@tanstack/react-query';
import { store } from '../config/redux/store';
import Calendario from '../models/Calendario';
import { updateToken } from '../utils/utils';
import { useEffect, useState } from 'react';
import { errorHandler } from '../utils/errorHandler';
import { CalendarioList } from '../types/calendar';

export default function useCalendarioEscolar() {
  const nivel = store.getState().nivel;
  const year = store.getState().año;
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['calendario-escolar', nivel, year],
    queryFn: () => fetchCalendario(),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const [months, setMonths] = useState<{ [key: string]: Omit<CalendarioList, 'month'>[] }>({
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: [],
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    const dataByMonths = groupDataByMonths(data);
    setMonths(dataByMonths);
  }, [data]);

  return { months, isLoading, isFetching, error, refetch };
}

export async function fetchCalendario() {
  const response = await Calendario.fetchCalendario();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}

function groupDataByMonths(data: CalendarioList[]) {
  const blueprint: { [key: string]: Omit<CalendarioList, 'month'>[] } = {
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: [],
  };
  data.forEach((record) => {
    blueprint[record.month].push({ day: record.day, _id: record._id, createdAt: record.createdAt, status: record.status });
  });
  for (const month in blueprint) {
    blueprint[month].sort((old, current) => {
      return current.day < old.day ? 1 : -1;
    });
  }
  return blueprint;
}
