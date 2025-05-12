import { QueryClient } from '@tanstack/react-query';
import { errorHandler } from '../../utils/errorHandler';
import { handleMatricularNuevoAlumno } from '../../components/ui/Admin/MatriculaNueva/utils';
import { NuevoAlumno } from '../../types/alumno';

export const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
    retry: false,
    onError: (error) => {
      errorHandler(error);
    },
  },
});

export enum MutationKeys {
  MatricularNuevoAlumno = 'nueva-matricula',
  EditarAlumno = 'editar-alumno',
}
export enum QueryKeys {
  EmitirDocumentos = 'emitir-documentos',
  BuscarAlumnos = 'buscar-alumnos',
  Matriculados = 'matriculados',
  RegistroNotas = 'registro-notas',
  CursosSalon = 'cursos-salon',
}
queryClient.setMutationDefaults([MutationKeys.MatricularNuevoAlumno], {
  mutationFn: (nuevoAlumno: NuevoAlumno) => handleMatricularNuevoAlumno(nuevoAlumno),
  onError: (error) => errorHandler(error),
});
