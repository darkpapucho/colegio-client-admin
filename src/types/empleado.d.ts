import { SalonProfesor } from '../components/shared/Profesor/types';
import { AnuncioProfesor } from './anuncios';
export type HorarioCell = {
  curso: string;
  salon: string;
  startTime: string;
  endTime: string;
};

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
  anuncios: AnuncioProfesor[];
  horario: HorarioCell[];
};
