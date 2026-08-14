import { QueryClient } from '@tanstack/react-query';
import { errorHandler } from '../../utils/errorHandler';
import { handleMatricularNuevoAlumno } from '../../components/ui/Admin/MatriculaNueva/utils';
import { AMatriculado, NuevoAlumno } from '../../types/alumno';
import toaster from 'react-hot-toast';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { handleFetchMatriculados } from '../../hooks/useAlumnosMatriculados';
import { store } from '../redux/store';
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
  mutationFn: (args: { nuevoAlumno: NuevoAlumno; montoPension: number; montoMatricula: number }) => handleMatricularNuevoAlumno(args),
  onError: (error) => errorHandler(error),
  onSuccess: (nuevoAlumno: AMatriculado) => {
    const año = store.getState().año;
    toaster.success('La matrícula se realizó exitosamente');
    queryClient.invalidateQueries(['matriculados', nuevoAlumno.grado, nuevoAlumno.seccion, año]);
    queryClient.setQueryData(['matriculados', nuevoAlumno.grado, nuevoAlumno.seccion, año], (oldData: AMatriculado[] | undefined) => {
      if (!oldData) return [nuevoAlumno];
      return [...oldData, nuevoAlumno];
    });
    // queryClient.prefetchQuery({
    //   queryKey: ['matriculados', nuevoAlumno.grado, nuevoAlumno.seccion, año],
    //   queryFn: () => handleFetchMatriculados({ grado: nuevoAlumno.grado, seccion: nuevoAlumno.seccion, estados: 'EN PROCESO-DEFINITIVA' }),
    // });
  },
});
