import { useReducer, useRef, useState } from 'react';
import Table from '../../Table/Table';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { Container } from '../../../shared/Container';
import TableHeader from './TableHeader';
import ConclusionDescriptivaModal from './ConclusionDescriptivaModal';
import { Button } from '../../../shared/Button';
import { EVENT_NAME, convertPeriodoKeyToIndex } from './utils';
import TableBody from './TableBody';
import { useSearchParams } from 'react-router-dom';
import { registroReducer } from './registroReducer';
import { useImmerReducer } from 'use-immer';
import SubmitRegistro from './SubmitRegistro';
import CriteriosDesempenoModal from './CriteriosDesempenoModal';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Grado, Nivel } from '../../../../types/enums';
import { GetCompetenciasMap } from '../../../../utils/utils';
import { Text } from '../../../shared/Text';
import Select from '../../../shared/Select';
import { theme } from '../../../../config/styled/styled';
import SelectedRegistroReducer from './selectedRegistroReducer';

export default function RegistroNotasTable({ data, cursosMap }: { cursosMap: CursoMap[]; data: RegistroNota[] }) {
  const [searchParams] = useSearchParams();
  const nivel = useTypedSelector((state) => state.nivel);
  // const [registroUpdated, setRegistroUpdated] = useState<RegistroNota[]>(registroNotas);
  const [copyRegistro, dispatch] = useImmerReducer(registroReducer, data);

  const gridTemplateCols = `25rem 12rem repeat(${cursosMap.length}, 5rem) 8rem 8rem 4rem`;
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  const grado = searchParams.get('grado');
  const [showCDModal, setShowCDModal] = useState(false); //conc. descriptivas modal
  const [showENModal, setShowENModal] = useState(false); //edit notas modal
  // const [selectedRegistro, setSelectedRegistro] = useState<{ registro: RegistroNota; cursoKey?: string } | undefined>(undefined);
  const [selectedRegistro, dispatchSelectedRegistro] = useImmerReducer(SelectedRegistroReducer, { registro: data[0], cursoKey: '' });
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  console.log('registro notas table rendered');
  console.log({ copyRegistro, cursosMap, selectedRegistro });
  useCustomEvent('customSelect', listener);

  if (!data) return null;
  return (
    <>
      {copyRegistro.length > 0 && <SubmitRegistro copyRegistro={copyRegistro} />}
      {showENModal && selectedRegistro.registro !== undefined && (
        <CriteriosDesempenoModal
          onCloseModal={onCloseModal}
          title={`${selectedRegistro!.registro.apellidos + ', ' + selectedRegistro!.registro.nombres} : ${cursosMap.find((map) => map.key === selectedRegistro!.cursoKey)!.label}`}>
          <Container $direction="row" $width="100%" $bgColor={theme.colors.indigo[200]} $padding=".8rem .5rem">
            <Text $width="85%" $fontSize="small" $bold>
              Competencia
            </Text>
            <Text $width="15%" $fontSize="small" $bold>
              Nota
            </Text>
          </Container>
          <Container $width="100%" $gap="0.4rem">
            {GetCompetenciasMap({ nivel: nivel as unknown as Nivel, grado: grado! as Grado })
              .find((map) => map.key === selectedRegistro!.cursoKey)
              ?.competencias.map((competencia, index) => {
                console.log({ nota: selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index], key: selectedRegistro!.cursoKey });
                return (
                  <Container $direction="row" $width="100%" $bgColor={index % 2 === 0 ? theme.colors.gray[200] : theme.colors.gray[400]} key={competencia} $padding="0.4rem 0.4rem">
                    <Text $width="85%" $fontSize="small">
                      {competencia}
                    </Text>
                    <Select
                      tiny
                      name="editCompetencia"
                      width="15%"
                      options={[
                        { label: 'A', value: { cursoKey: selectedRegistro!.cursoKey, index, nota: 'A' } },
                        { label: 'B', value: { cursoKey: selectedRegistro!.cursoKey, index, nota: 'B' } },
                        { label: 'C', value: { cursoKey: selectedRegistro!.cursoKey, index, nota: 'C' } },
                        { label: 'AD', value: { cursoKey: selectedRegistro!.cursoKey, index, nota: 'AD' } },
                      ]}
                      label="grado"
                      defaultValue={{
                        label:
                          selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index] === ''
                            ? '-'
                            : selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index],
                        value: { cursoKey: selectedRegistro!.cursoKey, index, nota: selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index] },
                      }}
                    />
                  </Container>
                );
              })}
          </Container>
          <Button
            $primary
            $small
            onClick={() => {
              const nota = [...selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo]];
              console.log({ nota22: nota });
              dispatch({ type: 'updateNotaCurso', payload: { periodo, nota, cursoKey: selectedRegistro!.cursoKey!, alumnoId: selectedRegistro!.registro.alumnoId } });
              // updateConclusionesDescriptivas({ alumnoId: selectedRegistro!.alumnoId, periodo, value });
              setShowENModal(false);
              // setSelectedRegistro(undefined);
            }}>
            Grabar
          </Button>
          <Button $danger $small onClick={onCloseModal}>
            Cancelar
          </Button>
        </CriteriosDesempenoModal>
      )}
      {showCDModal && (
        <ConclusionDescriptivaModal apellidos={selectedRegistro!.registro.apellidos + ', ' + selectedRegistro!.registro.nombres} onCloseModal={onCloseModal}>
          <Container $direction="column" $gap="1rem" $width="100%" $padding="4px 0 0 0">
            <textarea
              maxLength={200}
              defaultValue={selectedRegistro?.registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)]}
              style={{ width: '100%', outline: 'none' }}
              rows={6}
              ref={textAreaRef}
            />
            <Button
              $primary
              $small
              onClick={() => {
                const value = textAreaRef!.current!.value;
                dispatch({ type: 'updateConclusionesDescriptivas', payload: { alumnoId: selectedRegistro!.registro.alumnoId, periodo, value: value.trim() } });
                // updateConclusionesDescriptivas({ alumnoId: selectedRegistro!.alumnoId, periodo, value });
                onCloseModal();
              }}>
              Grabar
            </Button>
            <Button
              $danger
              $small
              onClick={() => {
                setShowCDModal(false);
                // setSelectedRegistro(undefined);
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
      console.log({ selectedRegistro });
      const { cursoKey, index, nota } = value;
      dispatchSelectedRegistro({ type: 'updateNotasSelectedRegistroAction', payload: { nota, index, cursoKey, periodo } });
      // setSelectedRegistro((old) =>
      //   old ? { ...old, registro: { ...old.registro, cursos: { ...old.registro.cursos, [cursoKey]: { ...old.registro.cursos[cursoKey], [periodo]: record } } } } : old,
      // );
    }
  }
  function onCloseModal() {
    setShowCDModal(false);
    setShowENModal(false);
  }
  function openConclusionesDescriptivasModal(registro: RegistroNota) {
    // setSelectedRegistro(
    //   // alumnoId: registro.alumnoId,
    //   // alumnoNombre: registro.apellidos + ', ' + registro.nombres,
    //   // defaultValue: registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)],
    //   { registro },
    // );
    dispatchSelectedRegistro({ type: 'setSelectedRegistro', payload: { registro, cursoKey: '' } });
    setShowCDModal(true);
  }
  function openEditNotasModal({ registro, cursoKey }: { cursoKey: string; registro: RegistroNota }) {
    // setSelectedRegistro({ registro, cursoKey });
    dispatchSelectedRegistro({ type: 'setSelectedRegistro', payload: { registro, cursoKey } });
    setShowENModal(true);
  }
}
