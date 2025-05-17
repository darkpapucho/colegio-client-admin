import { EstadoMatricula } from './enums';

export type RecordNotas = {
  alumnoId: string;
  estadoMatricula: EstadoMatricula;
  alumno: string;
  cursos: {
    [key: string]: [number, number, number, number];
  };
  inasistencias: { justificadas: [number, number, number, number]; injustificadas: [number, number, number, number] };
  tardanzas: { justificadas: [number, number, number, number]; injustificadas: [number, number, number, number] };
  conducta: [number, number, number, number];
  conclusionesDescriptivas: [string, string, string, string];
  conductaPPFF: [number, number, number, number];
};
