import { Grado, Nota } from './enums';

export type CursosLabel = [];
//CURSOS
// export enum CursosLabelPrimaria {
//   MATEMATICA = 'Matemática',
//   CIENCIA_TECNOLOGIA = 'Ciencia y Tecnología',
//   PERSONAL_SOCIAL = 'Personal Social',
//   EDUCACION_FISICA = 'Educación Física',
//   COMUNICACION = 'Comunicación',
//   ARTE_CULTURA = 'Arte y Cultura',
//   INGLES = 'Inglés',
//   RELIGION = 'Educación Religiosa',
//   COMPETENCIAS_TRANSVERSALES = 'Competencias Transversales',
// }

export type CursoMap = { label: string; key: string; code: string };

export type CursoNotaRecord = {
  numCompetencias: number;
  primerPeriodo: Nota[];
  segundoPeriodo: Nota[];
  tercerPeriodo: Nota[];
  cuartoPeriodo: Nota[];
};
export type RegistroNota = {
  alumnoId: string;
  nombres: string;
  apellidos: string;
  estadoMatricula: EstadoMatricula;
  grado: Grado;
  seccion: Seccion;
  conclusionesDescriptivas: [string, string, string, string];
  tardanzas: {
    justificadas: [number, number, number, number];
    injustificadas: [number, number, number, number];
  };
  inasistencias: {
    justificadas: [number, number, number, number];
    injustificadas: [number, number, number, number];
  };
  cursos: {
    [key: string]: CursoNotaRecord;
  };
};

export type PeriodosKey = 'primerPeriodo' | 'segundoPeriodo' | 'tercerPeriodo' | 'cuartoPeriodo';
