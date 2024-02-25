import { PeriodosKey, RegistroNota } from '../../../../types/documento';
import { Nota } from '../../../../types/enums';

export type SelectedRegistroState = {
  registro: RegistroNota;
  cursoKey: string;
};

type SetSelectedRegistroAction = {
  type: 'setSelectedRegistro';
  payload: { registro: RegistroNota; cursoKey: string };
};

type UpdateNotaSelectedRegistroAction = {
  type: 'updateNotasSelectedRegistroAction';
  payload: { nota: Nota; index: number; cursoKey: string; periodo: PeriodosKey };
};
type ClearSelectedRegistro = {
  type: 'clearSelectedRegistro';
};

export type SelectedRegistroActionsReducer = SetSelectedRegistroAction | UpdateNotaSelectedRegistroAction | ClearSelectedRegistro;
export default function SelectedRegistroReducer(state: SelectedRegistroState, action: SelectedRegistroActionsReducer) {
  const { type } = action;
  switch (type) {
    case 'setSelectedRegistro':
      state.registro = action.payload.registro;
      state.cursoKey = action.payload.cursoKey;
      break;

    case 'updateNotasSelectedRegistroAction': {
      if (!state.registro) return;
      const { nota, index, cursoKey, periodo } = action.payload;
      state.registro.cursos[cursoKey][periodo][index] = nota;
      break;
    }
    // case 'clearSelectedRegistro':
    //   state.registro = undefined;
    //   break;
    default:
      return state;
  }
}
