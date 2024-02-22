import { useRef, useState } from 'react';
import Table from '../../Table/Table';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { Container } from '../../../shared/Container';
import TableHeader from './TableHeader';
import ConclusionDescriptivaModal from './ConclusionDescriptivaModal';
import { Button } from '../../../shared/Button';
import { EVENT_NAME } from './utils';
import TableBody from './TableBody';
import { useSearchParams } from 'react-router-dom';
import { registroReducer } from './registroReducer';
import { useImmerReducer } from 'use-immer';
import SubmitRegistro from './SubmitRegistro';

export default function RegistroNotasTable({ data, cursosMap }: { cursosMap: CursoMap[]; data: RegistroNota[] }) {
  console.log('registro notas table rendered');
  const [searchParams] = useSearchParams();

  // const [registroUpdated, setRegistroUpdated] = useState<RegistroNota[]>(registroNotas);
  const [copyRegistro, dispatch] = useImmerReducer(registroReducer, data);
  console.log({ copyRegistro });
  const gridTemplateCols = `25rem 12rem repeat(${cursosMap.length}, 5rem) 8rem 8rem 4rem`;
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState<{ alumnoId: string; alumnoNombre: string; defaultValue: string } | undefined>(undefined);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useCustomEvent('customSelect', listener);
  if (!data) return null;
  return (
    <>
      {copyRegistro.length > 0 && <SubmitRegistro copyRegistro={copyRegistro} />}
      {showModal && (
        <ConclusionDescriptivaModal apellidos={selectedRegistro!.alumnoNombre} onCloseModal={onCloseModal}>
          <Container $direction="column" $gap="1rem" $width="100%" $padding="4px 0 0 0">
            <textarea maxLength={200} defaultValue={selectedRegistro?.defaultValue} style={{ width: '100%', outline: 'none' }} rows={6} ref={textAreaRef} />
            <Button
              $primary
              $small
              onClick={() => {
                const value = textAreaRef!.current!.value;
                dispatch({ type: 'updateConclusionesDescriptivas', payload: { alumnoId: selectedRegistro!.alumnoId, periodo, value } });
                // updateConclusionesDescriptivas({ alumnoId: selectedRegistro!.alumnoId, periodo, value });
                setShowModal(false);
                setSelectedRegistro(undefined);
              }}>
              Grabar
            </Button>
            <Button
              $danger
              $small
              onClick={() => {
                setShowModal(false);
                setSelectedRegistro(undefined);
              }}>
              Cancelar
            </Button>
          </Container>
        </ConclusionDescriptivaModal>
      )}
      <Table withBorder={true} gridTemplateColumns={gridTemplateCols} width="content-fit">
        {cursosMap?.length > 0 && <TableHeader cursosList={cursosMap} />}
        {data.length > 0 && (
          <TableBody
            dispatch={dispatch}
            key={periodo}
            copyRegistro={copyRegistro}
            cursosMap={cursosMap}
            periodo={periodo}
            setShowModal={setShowModal}
            setSelectedRegistro={setSelectedRegistro}
          />
        )}
      </Table>
    </>
  );

  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === EVENT_NAME) {
      dispatch({ type: 'updateNotaCurso', payload: value });
    }
  }
  function onCloseModal() {
    setShowModal(false);
    setSelectedRegistro(undefined);
  }
}
