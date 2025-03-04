export type SalonProfesor = { tutor: boolean; label: string; value: { grado: Grado; seccion: Seccion }; order: number; cursos: { label: string; key: string }[] };
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
