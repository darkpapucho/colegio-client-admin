import { Profesor } from '../../../types/empleado';
import { SalonProfesor } from './types';

type UpdateTutoria = {
  type: 'updateTutoria';
  payload: { salon: string; value: boolean };
};
type AddSalon = {
  type: 'addSalon';
  payload: SalonProfesor;
};

type DeleteSalon = {
  type: 'deleteSalon';
  payload: string;
};
type UpdateProfesorData = {
  type: 'updateProfesorData';
  payload: { field: 'nombres' | 'apellidos' | 'dni' | 'telefono' | 'correo'; value: string };
};
type SetProfesorAction = {
  type: 'setProfesor';
  payload: Profesor;
};
// type ClearProfesorAction = {
//   type: 'clearProfesor';
// };
type DeleteCursoFromSalonAction = {
  type: 'deleteCursoFromSalon';
  payload: { salonLabel: string; cursoKey: string };
};
type AddCursoToSalonAction = {
  type: 'addCursoToSalon';
  payload: { key: string; label: string; code: string; short: string; salon: string };
};

export type ProfesorReducerAction =
  | SetProfesorAction
  | DeleteCursoFromSalonAction
  | AddCursoToSalonAction
  | UpdateProfesorData
  | DeleteSalon
  | AddSalon
  | UpdateTutoria;
export default function ProfesorReducer(state: { profesor: Profesor }, action: ProfesorReducerAction) {
  const { type } = action;
  switch (type) {
    case 'updateTutoria': {
      const salonIndex = state.profesor.salones.findIndex((salon) => salon.label === action.payload.salon);
      state.profesor.salones[salonIndex].tutor = action.payload.value;
      break;
    }

    case 'addSalon': {
      const salonIndex = state.profesor.salones.findIndex((salon) => salon.label === action.payload.label);
      if (salonIndex === -1) {
        state.profesor.salones.push(action.payload);
      }
      break;
    }
    case 'deleteSalon':
      state.profesor.salones = state.profesor.salones.filter((salon) => salon.label !== action.payload);
      break;
    case 'updateProfesorData': {
      const payload = action.payload;
      const { field, value } = payload;
      switch (field) {
        case 'nombres':
        case 'apellidos':
        case 'correo':
          state.profesor[field] = value;
          break;
        case 'dni':
        case 'telefono':
          state.profesor[field] = +value;
          break;
        default:
          return state;
      }
      break;
    }
    case 'addCursoToSalon': {
      const salonIndex = state.profesor.salones.findIndex((salon) => salon.label === action.payload.salon);
      const cursoIndex = state.profesor.salones[salonIndex].cursos.findIndex((curso) => curso.key === action.payload.key);
      if (cursoIndex === -1) {
        state.profesor.salones[salonIndex].cursos.push({
          label: action.payload.label,
          key: action.payload.key,
          short: action.payload.short,
          code: action.payload.code,
        });
      }
      break;
    }
    case 'deleteCursoFromSalon': {
      const salonIndex = state.profesor.salones.findIndex((salon) => salon.label === action.payload.salonLabel);
      state.profesor.salones[salonIndex].cursos = state.profesor.salones[salonIndex].cursos.filter((curso) => curso.key !== action.payload.cursoKey);
      break;
    }
    case 'setProfesor':
      state.profesor = action.payload;
      break;
    default:
      return state;
  }
}
