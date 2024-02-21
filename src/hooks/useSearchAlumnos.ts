import { useQuery } from '@tanstack/react-query';
import { Alumno } from '../models/alumno';
import { updateToken } from '../utils/utils';
import { EstadoMatricula } from '../types/enums';
import { QueryKeys } from '../config/query/query';

export default function useSearchAlumno({
  searchBoxRef,
  estadosMatricula,
}: {
  searchBoxRef: React.MutableRefObject<HTMLInputElement | null>;
  estadosMatricula: EstadoMatricula[];
}) {
  const {
    isFetching,
    data: alumnos,
    refetch,
    error,
  } = useQuery({
    queryKey: [QueryKeys.BuscarAlumnos],
    queryFn: () => handleSearch(),
    enabled: false,
  });

  return { isFetching, alumnos, refetch, error };

  async function handleSearch() {
    const alumnoData = searchBoxRef.current?.value;
    if (!alumnoData || alumnoData == '') throw new Error('olvidaste ingresar los datos del alumno');
    const response = await Alumno.buscarAlumno({ nombreCompleto: alumnoData, estadosMatricula });
    updateToken(response);
    if (response.data.ok) {
      return response.data.payload;
    } else {
      throw new Error('no se pudo realizar la operación');
    }
  }
}
