import { Dispatch, SetStateAction, createContext } from 'react';
import { Profesor } from '../../../types/empleado';
import { ProfesorReducerAction } from './ProfesorReducer';
import { SalonProfesor } from './types';

export const ProfesoresContext = createContext<{ isLoading: boolean; dispatch: Dispatch<ProfesorReducerAction>; setShowModal: Dispatch<SetStateAction<boolean>> } | null>(null);
export const initialState: Profesor = {
  nombres: '',
  apellidos: '',
  dni: 0,
  rol: 'profesor',
  _id: '',
  userId: '',
  salones: [] as SalonProfesor[],
};
