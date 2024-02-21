import { MutationFunction, useMutation } from '@tanstack/react-query';

export default function useEditarAlumno(handleSubmit: MutationFunction<unknown, void>) {
  const {
    error,
    isError,
    isLoading,
    mutate: editarAlumno,
    isSuccess,
  } = useMutation({
    mutationFn: () => handleSubmit(),
    mutationKey: ['editar-alumno'],
  });
  return { error, isError, isSuccess, editarAlumno, isLoading };
}
