import { SalonProfesor } from '../../../shared/Profesor/types';

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
type DeleteCursoFromSalonAction = {
  type: 'deleteCursoFromSalon';
  payload: { salonLabel: string; cursoKey: string };
};
type AddCursoToSalonAction = {
  type: 'addCursoToSalon';
  payload: { cursoKey: string; cursoLabel: string; salon: string };
};
export type SalonReducerActions = AddCursoToSalonAction | DeleteCursoFromSalonAction | DeleteSalon | AddSalon | UpdateTutoria;
export default function SalonesReducer(state: { salones: SalonProfesor[] }, action: SalonReducerActions) {
  const type = action.type;
  switch (type) {
    case 'updateTutoria': {
      const salonIndex = state.salones.findIndex((salon) => salon.label === action.payload.salon);
      state.salones[salonIndex].tutor = action.payload.value;
      break;
    }

    case 'addSalon': {
      const salonIndex = state.salones.findIndex((salon) => salon.label === action.payload.label);
      if (salonIndex === -1) {
        state.salones.push(action.payload);
      }
      break;
    }
    case 'deleteSalon':
      state.salones = state.salones.filter((salon) => salon.label !== action.payload);
      break;

    case 'addCursoToSalon': {
      const salonIndex = state.salones.findIndex((salon) => salon.label === action.payload.salon);
      const cursoIndex = state.salones[salonIndex].cursos.findIndex((curso) => curso.key === action.payload.cursoKey);
      if (cursoIndex === -1) {
        state.salones[salonIndex].cursos.push({ label: action.payload.cursoLabel, key: action.payload.cursoKey });
      }
      break;
    }
    case 'deleteCursoFromSalon': {
      const salonIndex = state.salones.findIndex((salon) => salon.label === action.payload.salonLabel);
      state.salones[salonIndex].cursos = state.salones[salonIndex].cursos.filter((curso) => curso.key !== action.payload.cursoKey);
      break;
    }
    default:
      return state;
  }
}
