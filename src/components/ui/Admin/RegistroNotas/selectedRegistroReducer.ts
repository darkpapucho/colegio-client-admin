import { PeriodosKey } from '../../../../types/documento';

import { RecordNotas } from '../../../../types/notas';
import { convertPeriodoKeyToIndex } from './utils';

export type SelectedRegistroState = {
  registro: RecordNotas;
  cursoKey: string;
};

type SetSelectedRegistroAction = {
  type: 'setSelectedRegistro';
  payload: { registro: RecordNotas; cursoKey: string };
};

type UpdateNotaSelectedRegistroAction = {
  type: 'updateNotasSelectedRegistroAction';
  payload: { nota: number; cursoKey: string; periodo: PeriodosKey };
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
      const { nota, cursoKey, periodo } = action.payload;
      state.registro.cursos[cursoKey][convertPeriodoKeyToIndex(periodo)] = nota;
      break;
    }
    // case 'clearSelectedRegistro':
    //   state.registro = undefined;
    //   break;
    default:
      return state;
  }
}
