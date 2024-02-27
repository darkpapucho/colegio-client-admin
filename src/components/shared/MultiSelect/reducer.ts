import { MultiSelectOptionType } from './types';

type SelectOneOption = {
  type: 'selectOneOption';
  payload: MultiSelectOptionType;
};
type RemoveOneOption = {
  type: 'removeOneOption';
  payload: MultiSelectOptionType;
};

export default function MultiSelectReducer(state: { options: MultiSelectOptionType[]; selectedOptions: MultiSelectOptionType[] }, action: SelectOneOption | RemoveOneOption) {
  const { type } = action;
  switch (type) {
    case 'removeOneOption':
      state.options.push(action.payload);
      state.options = state.options.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      state.selectedOptions = state.selectedOptions.filter((option) => option.label !== action.payload.label) as MultiSelectOptionType[];
      state.selectedOptions = state.selectedOptions.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      break;
    case 'selectOneOption':
      state.options = state.options.filter((option) => option.label !== action.payload.label) as MultiSelectOptionType[];
      state.options = state.options.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      state.selectedOptions.push(action.payload);
      state.selectedOptions = state.selectedOptions.sort((old, curr) => (curr.order > old.order ? -1 : 1));
      break;
    default:
      return state;
  }
}
