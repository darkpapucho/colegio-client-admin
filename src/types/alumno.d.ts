import { EstadoMatricula } from './enums';
type Sexo = 'Hombre' | 'Mujer';
export interface AMatriculado {
  // Alumno Matriculado
  _id: string;
  nombres: string;
  apellidos: string;
  grado: Grado;
  seccion: Seccion;
  estadoMatricula: EstadoMatricula;
  fechaMatricula: string;
  fechaRetiro?: string;
  sexo: Sexo;
  dni?: string;
  codigoEstudiante: string;
  nombreCompleto: string;
}
export interface NuevoAlumno {
  nombres: string;
  apellidos: string;
  grado: Grado;
  seccion: Seccion;
  fechaMatricula: string;
  sexo: Sexo;
  dni?: string;
  codigoEstudiante: string;
}

export type PartialAlumno = {
  [item in keyof AMatriculado]?: AMatriculado[item];
};
