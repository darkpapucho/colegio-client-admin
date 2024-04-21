import { useState } from 'react';
import Table from '../../Table/Table';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import TableHeader from './TableHeader';
import ConclusionDescriptivaModal from './ConclusionDescriptivaModal';
import { EVENT_NAME } from './utils';
import TableBody from './TableBody';
import { useSearchParams } from 'react-router-dom';
import { registroReducer } from './registroReducer';
import { useImmerReducer } from 'use-immer';
import SubmitRegistro from './SubmitRegistro';
import CriteriosDesempenoModal from './CriteriosDesempenoModal';
import SelectedRegistroReducer from './selectedRegistroReducer';
import AllDetailsModal from './AllDetailsModal';
import { Button } from '../../../shared/Button';

export default function RegistroNotasTable({ data, cursosMap }: { cursosMap: CursoMap[]; data: RegistroNota[] }) {
  const [searchParams] = useSearchParams();
  const [copyRegistro, dispatch] = useImmerReducer(registroReducer, data);

  const gridTemplateCols = `34rem 12rem repeat(${cursosMap.length}, 5rem) 8rem 8rem 4rem`;
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  const [showCDModal, setShowCDModal] = useState(false); //conc. descriptivas modal
  const [showENModal, setShowENModal] = useState(false); //edit notas modal
  const [selectedRegistro, dispatchSelectedRegistro] = useImmerReducer(SelectedRegistroReducer, { registro: data[0], cursoKey: '' });
  const [showAllDetailsModal, setShowAllDetailsModal] = useState(false);
  useCustomEvent('customSelect', listener);

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
      {showCDModal && <ConclusionDescriptivaModal registro={selectedRegistro.registro} onCloseModal={onCloseModal} dispatch={dispatch}></ConclusionDescriptivaModal>}
      <Table withBorder={true} gridTemplateColumns={gridTemplateCols} width="content-fit">
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

  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === EVENT_NAME) {
      dispatch({ type: 'updateNotaCurso', payload: value });
    } else if (name === 'editCompetencia') {
      const { cursoKey, index, nota } = value;
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
