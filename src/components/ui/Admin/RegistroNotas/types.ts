import { CURSO, CURSO_KEY } from '../../../../types/cursos/types';

export type RegistroNotasTableProps = {
  alumno: string;
  alumnoId: string;
  notas: {
    cursoKey: CURSO_KEY;
    notas: [number, number, number, number];
  }[];
};
