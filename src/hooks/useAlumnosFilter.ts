import { useSearchParams } from 'react-router-dom';
import { EstadoMatricula } from '../types/enums';

export default function useEstadoMatriculaFilter<T extends { estadoMatricula: EstadoMatricula }>({ records }: { records: T[] | undefined }) {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('estadoMatricula') as EstadoMatricula | 'TODOS' | undefined;
  let matriculadosFiltered: T[] | undefined = records;
  switch (filter) {
    case 'TODOS':
      matriculadosFiltered = records;
      break;
    case 'DEFINITIVA':
      matriculadosFiltered = records?.filter((alumno) => alumno.estadoMatricula === 'DEFINITIVA');
      break;
    case 'SUSPENDIDO':
      matriculadosFiltered = records?.filter((alumno) => alumno.estadoMatricula === 'SUSPENDIDO');
      break;
    case 'TRASLADADO':
      matriculadosFiltered = records?.filter((alumno) => alumno.estadoMatricula === 'TRASLADADO');
      break;
    case 'RETIRADO':
      matriculadosFiltered = records?.filter((alumno) => alumno.estadoMatricula === 'RETIRADO');
      break;
    default:
      matriculadosFiltered = records;
  }
  return matriculadosFiltered;
}
