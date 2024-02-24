import { Grado, Nota } from './enums';

export type CursosLabel = [];

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

export type CURSO_BOLETA_NOTA = {
  label: string;
  key: string;
  competencias: string[];
};
