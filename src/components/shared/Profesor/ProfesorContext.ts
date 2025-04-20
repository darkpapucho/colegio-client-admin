import { Dispatch, SetStateAction, createContext } from 'react';
import { HorarioCell, Profesor } from '../../../types/empleado';
import { ProfesorReducerAction } from './ProfesorReducer';
import { SalonProfesor } from './types';
import { AnuncioProfesor } from '../../../types/anuncios';

export const ProfesoresContext = createContext<{
  isLoading: boolean;
  dispatch: Dispatch<ProfesorReducerAction>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
} | null>(null);
export const initialState: Profesor = {
  nombres: '',
  apellidos: '',
  dni: 0,
  rol: 'profesor',
  _id: '',
  userId: '',
  salones: [] as SalonProfesor[],
  anuncios: [] as AnuncioProfesor[],
  horario: [] as HorarioCell[],
};
