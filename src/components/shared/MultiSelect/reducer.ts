import { SalonProfesor } from '../Profesor/types';

type SelectOneOption = {
  type: 'selectOneOption';
  payload: SalonProfesor;
};
type RemoveOneOption = {
  type: 'removeOneOption';
  payload: SalonProfesor;
};

export default function MultiSelectReducer(
  state: { options: SalonProfesor[]; selectedOptions: SalonProfesor[] },
  action: SelectOneOption | RemoveOneOption,
) {
  const { type } = action;
  switch (type) {
    case 'removeOneOption':
      state.options.push(action.payload);
      state.options = state.options.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      state.selectedOptions = state.selectedOptions.filter((option) => option.label !== action.payload.label) as SalonProfesor[];
      state.selectedOptions = state.selectedOptions.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      break;
    case 'selectOneOption':
      state.options = state.options.filter((option) => option.label !== action.payload.label) as SalonProfesor[];
      state.options = state.options.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      state.selectedOptions.push(action.payload);
      state.selectedOptions = state.selectedOptions.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      break;
    default:
      return state;
  }
}
