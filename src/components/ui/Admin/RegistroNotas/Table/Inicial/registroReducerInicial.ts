import { PeriodosKey, RegistroNota } from '../../../../../../types/documento';
import { Nota } from '../../../../../../types/enums';
import toaster from 'react-hot-toast';
import { convertPeriodoKeyToIndex } from '../../utils';
type UpdateTardanzasInasistenciasAction = {
  type: 'updateTardanzasInasistencias';
  payload: {
    periodo: PeriodosKey;
    alumnoId: string;
    subfield: 'injustificadas' | 'justificadas';
    value: number;
    field: 'inasistencias' | 'tardanzas';
  };
};

type UpdateNotaCursoAction = {
  type: 'updateNotaCurso';
  payload: { periodo: PeriodosKey; nota: (Nota | '')[]; cursoKey: string; alumnoId: string };
};
type UpdateConclusionesDescriptivasAction = {
  type: 'updateConclusionesDescriptivas';
  payload: { alumnoId: string; periodo: PeriodosKey; value: string };
};

export type InicialRegistroReducer = UpdateTardanzasInasistenciasAction | UpdateNotaCursoAction | UpdateConclusionesDescriptivasAction;

export function inicialRegistroReducer(state: RegistroNota[], action: InicialRegistroReducer) {
  const { type, payload } = action;
  switch (type) {
    case 'updateNotaCurso': {
      const { alumnoId, periodo, cursoKey, nota } = payload;
      const index = state.findIndex((registro) => registro.alumnoId === alumnoId);
      const numCompetencias = state[index]['cursos'][cursoKey].numCompetencias;

      for (let i = 0; i < numCompetencias; i++) {
        state[index]['cursos'][cursoKey][periodo][i] = nota[i];
      }
      break;
    }
    case 'updateConclusionesDescriptivas': {
      const MAX_ALLOWED_CHARACTERS = 200;
      const { alumnoId, periodo, value } = payload;
      const index = state.findIndex((registro) => registro.alumnoId === alumnoId);
      let slicedValue = value;
      if (value.length >= MAX_ALLOWED_CHARACTERS) {
        toaster.error('El comentario debe contener como maximo 100 caracteres');
        slicedValue = value.slice(0, MAX_ALLOWED_CHARACTERS);
      }
      state[index]['conclusionesDescriptivas'][convertPeriodoKeyToIndex(periodo)] = slicedValue;
      break;
    }
    case 'updateTardanzasInasistencias': {
      const { periodo, alumnoId, subfield, value, field } = payload;
      const index = state.findIndex((registro) => registro.alumnoId === alumnoId);
      state[index][field][subfield][convertPeriodoKeyToIndex(periodo)] = value;
      break;
    }
    default:
      return state;
  }
}
