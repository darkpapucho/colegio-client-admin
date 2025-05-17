export type SalonProfesor = {
  label: string;
  order: number;
  tutor: boolean;
  value: { grado: Grado; seccion: Seccion };
  cursos: { label: string; key: string; short: string; code: string }[];
};

type AddCursoAction = {
  type: 'updateSelectedSalones';
  payload: SalonProfesor[];
};

export type ProfesorData = {
  nombres: string;
  apellidos: string;
  dni: STRING;
  telefono?: number;
  correo?: string;
  salones: SalonProfesor[];
};
