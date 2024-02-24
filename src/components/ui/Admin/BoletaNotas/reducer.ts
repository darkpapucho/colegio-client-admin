import { ImmerReducer } from 'use-immer';
import { AMatriculado } from '../../../../types/alumno';

export type ReducerState = {
  mode: 'individual' | 'salon';
  loading: boolean;
  showModal: boolean;
  alumnos: AMatriculado[] | undefined;
  selectedAlumno: AMatriculado | undefined;
};

export enum ActionsType {
  FireSearchAlumnosAction = 'fireSearchAlumnos',
  UpdateAlumnosResultAction = 'updateAlumnosResult',
  OpenSelectedAlumnoModal = 'openSelectedAlumnoModal',
  ChangeModeAction = 'changeMode',
  CloseSelectedAlumnoModal = 'closeSelectedAlumnoModal',
  SetIsLoading = 'setIsLoading',
  ClearIsLoading = 'clearIsLoading',
}

type ChangeModeAction = { type: 'changeMode'; payload: 'individual' | 'salon' };
type FireSearchAlumnosAction = { type: 'fireSearchAlumnos' };
type UpdateAlumnosResultAction = { type: 'updateAlumnosResult'; payload: AMatriculado[] };
type OpenSelectedAlumnoModal = { type: 'openSelectedAlumnoModal'; payload: AMatriculado };
type CloseSelectedAlumnoModal = { type: 'closeSelectedAlumnoModal' };
type SetIsLoading = { type: 'setIsLoading' };
type ClearIsLoading = { type: 'clearIsLoading' };

export type BoletaNotasActionReducer =
  | FireSearchAlumnosAction
  | UpdateAlumnosResultAction
  | OpenSelectedAlumnoModal
  | SetIsLoading
  | ChangeModeAction
  | CloseSelectedAlumnoModal
  | ClearIsLoading;

export const BoletaNotasReducer: ImmerReducer<ReducerState, BoletaNotasActionReducer> = (state, action) => {
  const type = action.type;
  switch (type) {
    case ActionsType.ChangeModeAction:
      state.mode = action.payload;
      return;
    case ActionsType.FireSearchAlumnosAction:
      state.loading = true;
      return;
    case ActionsType.UpdateAlumnosResultAction:
      state.alumnos = action.payload;
      state.loading = false;
      return;
    case ActionsType.OpenSelectedAlumnoModal:
      state.selectedAlumno = action.payload;
      state.showModal = true;
      return;
    case ActionsType.CloseSelectedAlumnoModal:
      state.selectedAlumno = undefined;
      state.showModal = false;
      return;
    case ActionsType.SetIsLoading:
      state.loading = true;
      return;
    case ActionsType.ClearIsLoading:
      state.loading = false;
      return;
    default:
      return state;
  }
};
