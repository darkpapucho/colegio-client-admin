import { SalonProfesor } from '../components/shared/Profesor/types';

export type Profesor = {
  nombres: string;
  apellidos: string;
  dni: number;
  salones: SalonProfesor[];
  telefono?: number;
  correo?: string;
  rol: 'profesor';
  userId: string;
  _id: string;
};
