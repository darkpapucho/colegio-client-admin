import { SalonProfesor } from '../components/ui/Admin/AgregarProfesor/selectedSalonesReducer';

export type Profesor = {
  nombres: string;
  apellidos: string;
  dni: number;
  salones: SalonProfesor[];
  telefono?: number;
  rol: 'profesor';
  userId: string;
  _id: string;
};
