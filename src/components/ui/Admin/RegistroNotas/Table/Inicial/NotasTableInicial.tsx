import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import useCustomEvent from '../../../../../../hooks/useCustomEvent';
import { CursoMap, RegistroNota } from '../../../../../../types/documento';
import { Button } from '../../../../../shared/Button';
import Table from '../../../../Table/Table';
import AllDetailsModal from '../../AllDetailsModal';
import ConclusionDescriptivaModal from '../../ConclusionDescriptivaModal';
import CriteriosDesempenoModal from '../../CriteriosDesempenoModal';
import SubmitRegistro from '../../SubmitRegistro';
import TableBody from '../../TableBody';
import TableHeader from '../../TableHeader';
import { getSelectedPeriodo, convertPeriodoKeyToIndex, EVENT_NAME } from '../../utils';
import { inicialRegistroReducer } from './registroReducerInicial';
import SelectedRegistroReducer from './selectedRegistroReducerBackup';

export default function NotasTableInicial({ data, cursosMap }: { cursosMap: CursoMap[]; data: RegistroNota[] }) {
  const [searchParams] = useSearchParams();
  const [copyRegistro, dispatch] = useImmerReducer(inicialRegistroReducer, data);
  const periodo = getSelectedPeriodo(searchParams);
  const gridTemplateCols = `34rem 12rem repeat(${cursosMap.length}, 5rem) 8rem 8rem 4rem`;

  const [showCDModal, setShowCDModal] = useState(false); //conc. descriptivas modal
  const [showENModal, setShowENModal] = useState(false); //edit notas modal
  const [selectedRegistro, dispatchSelectedRegistro] = useImmerReducer(SelectedRegistroReducer, { registro: data[0], cursoKey: '' });
  const [showAllDetailsModal, setShowAllDetailsModal] = useState(false);
  useCustomEvent('customSelect', customSelectListener);

  if (!data) return null;
  return (
    <>
      {showAllDetailsModal && selectedRegistro.registro !== undefined && (
        <AllDetailsModal
          cursosList={cursosMap}
          registro={selectedRegistro.registro}
          onCloseModal={() => setShowAllDetailsModal(false)}
          title={selectedRegistro.registro.apellidos + ', ' + selectedRegistro.registro.nombres}>
          <Button $danger onClick={() => setShowAllDetailsModal(false)} $width="max-content">
            Close
          </Button>
        </AllDetailsModal>
      )}
      {copyRegistro.length > 0 && <SubmitRegistro copyRegistro={copyRegistro} />}
      {showENModal && selectedRegistro.registro !== undefined && (
        <CriteriosDesempenoModal
          onCloseModal={onCloseModal}
          dispatch={dispatch}
          selectedRegistro={selectedRegistro}
          title={`${selectedRegistro!.registro.apellidos + ', ' + selectedRegistro!.registro.nombres} : ${
            cursosMap.find((map) => map.key === selectedRegistro!.cursoKey)!.label
          }`}></CriteriosDesempenoModal>
      )}
      {showCDModal && (
        <ConclusionDescriptivaModal
          nivel="inicial"
          alumno={selectedRegistro.registro.apellidos + ', ' + selectedRegistro.registro.nombres}
          alumnoId={selectedRegistro.registro.alumnoId}
          initialValue={selectedRegistro.registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)]}
          onCloseModal={onCloseModal}
          dispatch={dispatch}
        />
      )}
      <Table withBorder={true} gridTemplateColumns={gridTemplateCols} width="fit-content">
        {cursosMap?.length > 0 && <TableHeader cursosList={cursosMap} />}
        {data.length > 0 && (
          <TableBody
            openAllDetailsModal={openAllDetailsModal}
            cursosMap={cursosMap}
            openEditNotasModal={openEditNotasModal}
            dispatch={dispatch}
            key={periodo}
            copyRegistro={copyRegistro}
            periodo={periodo}
            openConclusionesDescriptivasModal={openConclusionesDescriptivasModal}
          />
        )}
      </Table>
    </>
  );

  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === EVENT_NAME) {
      dispatch({ type: 'updateNotaCurso', payload: value });
    } else if (name === 'editCompetencia') {
      const { cursoKey, index, nota, periodo } = value;
      dispatchSelectedRegistro({ type: 'updateNotasSelectedRegistroAction', payload: { nota, index, cursoKey, periodo } });
    }
  }
  function onCloseModal() {
    setShowCDModal(false);
    setShowENModal(false);
  }
  function openConclusionesDescriptivasModal(registro: RegistroNota) {
    dispatchSelectedRegistro({ type: 'setSelectedRegistro', payload: { registro, cursoKey: '' } });
    setShowCDModal(true);
  }
  function openEditNotasModal({ registro, cursoKey }: { cursoKey: string; registro: RegistroNota }) {
    // setSelectedRegistro({ registro, cursoKey });
    dispatchSelectedRegistro({ type: 'setSelectedRegistro', payload: { registro, cursoKey } });
    setShowENModal(true);
  }
  function openAllDetailsModal(record: RegistroNota) {
    setShowAllDetailsModal(true);
    dispatchSelectedRegistro({ type: 'setSelectedRegistro', payload: { registro: record, cursoKey: '' } });
  }
}
