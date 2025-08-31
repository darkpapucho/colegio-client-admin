import { Fragment, useState } from 'react';
import { CURSO } from '../../../../../../types/cursos/types';
import Table from '../../../../Table/Table';
import { PeriodosKey } from '../../../../../../types/documento';
import { convertPeriodoKeyToIndex, EVENT_NAME } from '../../utils';
import { RecordNotas } from '../../../../../../types/notas';
import SpecialBlock from '../../SpecialBlock';
import { theme } from '../../../../../../config/styled/styled';
import { Container } from '../../../../../shared/Container';
import { useImmerReducer } from 'use-immer';
import useCustomEvent from '../../../../../../hooks/useCustomEvent';
import { primariaRegistroReducer } from './registroReducerPrimaria';
import NotaTab from './NotaTab';
import DisplayHoverMessage from '../../../../../shared/DisplayHoverMessage';
import ConclusionDescriptivaModal from '../../ConclusionDescriptivaModal';
import { FaCheck } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';
import SubmitRegistro from '../../SubmitRegistro';
import { darkenColor } from '../../../../../../utils/tinyColor';

export default function NotasTablePrimaria({
  registro,
  cursosSalon,
  periodo,
}: {
  cursosSalon: CURSO[];
  registro: RecordNotas[];
  periodo: PeriodosKey;
}) {
  const [showCDModal, setShowCDModal] = useState(false);
  const [copyRegistro, dispatch] = useImmerReducer(primariaRegistroReducer, registro);
  const [selectedRecord, setSelectedRecord] = useState<RecordNotas | undefined>(undefined);
  console.log({ copyRegistro });
  const gridTemplateCols = `34rem 12rem repeat(${cursosSalon.length}, 6rem) 8rem 8rem 4rem 4rem`;

  useCustomEvent('customSelect', customSelectListener);
  function onCloseModal() {
    setSelectedRecord(undefined);
    setShowCDModal(false);
  }
  return (
    <>
      {showCDModal && selectedRecord && (
        <ConclusionDescriptivaModal
          initialValue={selectedRecord.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)]}
          nivel="primaria"
          alumno={selectedRecord.alumno}
          alumnoId={selectedRecord.alumnoId}
          onCloseModal={onCloseModal}
          dispatch={dispatch}></ConclusionDescriptivaModal>
      )}
      {copyRegistro.length > 0 && <SubmitRegistro copyRegistro={copyRegistro} />}
      <Table width="fit-content" gridTemplateColumns={gridTemplateCols} withBorder>
        <Table.Header>
          <Table.Header.Item>Alumno</Table.Header.Item>
          <Table.Header.Item>Est. Mat.</Table.Header.Item>
          {cursosSalon.map((curso) => (
            <Table.Header.Item key={curso.key}>
              <DisplayHoverMessage label={curso.code} message={curso.label} />
            </Table.Header.Item>
          ))}
          <Table.Header.Item>
            <SpecialBlock field="Tardan." />
          </Table.Header.Item>
          <Table.Header.Item>
            <SpecialBlock field="Inasis." />
          </Table.Header.Item>
          <Table.Header.Item>
            <DisplayHoverMessage label={'CX'} message="conducta" />
          </Table.Header.Item>
          <Table.Header.Item>CD</Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {copyRegistro.map((row, index) => {
            const alumno = row.alumno;

            return (
              <Fragment key={row.alumnoId}>
                <Table.Body.Item>
                  <Container
                    onClick={() => clickAlumnoHandle(row)}
                    $width="100%"
                    $alignItems="center"
                    $justifyContent="flex-start"
                    $bgColor={selectedRecord?.alumnoId == row.alumnoId ? '#a5fa60' : '#eee'}>
                    {`[${index + 1}]` + row.alumno}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $width="100%"
                    $alignItems="center"
                    $justifyContent="center"
                    $bgColor={selectedRecord?.alumnoId == row.alumnoId ? '#a5fa60' : '#eee'}>
                    {row.estadoMatricula}
                  </Container>
                </Table.Body.Item>
                {cursosSalon.map((curso) => {
                  const nota = row.cursos[curso.key][convertPeriodoKeyToIndex(periodo)];
                  return (
                    <Table.Body.Item key={curso.key}>
                      <NotaTab
                        dispatch={dispatch}
                        periodo={periodo}
                        alumnoId={row.alumnoId}
                        cursoKey={curso.key}
                        initValue={nota}
                        $bgColor={selectedRecord?.alumnoId == row.alumnoId ? '#a5fa60' : '#eee'}
                      />
                    </Table.Body.Item>
                  );
                })}
                <Table.Body.Item $key={index}>
                  <Container $width="100%" $direction="row" $bgColor="white" $gap="1px" $padding="0">
                    <Container
                      $width="50%"
                      $bgColor={selectedRecord?.alumnoId == row.alumnoId ? darkenColor('#a5fa60', 25) : theme.colors.tertiary[400]}>
                      <input
                        min={0}
                        max={10}
                        style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                        type="number"
                        step={1}
                        defaultValue={row.tardanzas.justificadas[convertPeriodoKeyToIndex(periodo)]}
                        onChange={(event) =>
                          dispatch({
                            type: 'updateTardanzasInasistencias',
                            payload: { periodo, alumnoId: row.alumnoId, value: +event.target.value, field: 'tardanzas', subfield: 'justificadas' },
                          })
                        }
                      />
                    </Container>
                    <Container
                      $width="50%"
                      $bgColor={selectedRecord?.alumnoId == row.alumnoId ? darkenColor('#a5fa60', 25) : theme.colors.tertiary[400]}>
                      <input
                        min={0}
                        max={10}
                        style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                        type="number"
                        step={1}
                        defaultValue={row.tardanzas.injustificadas[convertPeriodoKeyToIndex(periodo)]}
                        onChange={(event) =>
                          dispatch({
                            type: 'updateTardanzasInasistencias',
                            payload: {
                              periodo,
                              alumnoId: row.alumnoId,
                              value: +event.target.value,
                              field: 'tardanzas',
                              subfield: 'injustificadas',
                            },
                          })
                        }
                      />
                    </Container>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <Container $width="100%" $direction="row" $bgColor="white" $gap="1px" $padding="0">
                    <Container
                      $width="50%"
                      $bgColor={selectedRecord?.alumnoId == row.alumnoId ? darkenColor('#a5fa60', 25) : theme.colors.tertiary[400]}>
                      <input
                        min={0}
                        max={10}
                        style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                        type="number"
                        step={1}
                        defaultValue={row.inasistencias.justificadas[convertPeriodoKeyToIndex(periodo)]}
                        onChange={(event) =>
                          dispatch({
                            type: 'updateTardanzasInasistencias',
                            payload: {
                              periodo,
                              alumnoId: row.alumnoId,
                              value: +event.target.value,
                              field: 'inasistencias',
                              subfield: 'justificadas',
                            },
                          })
                        }
                      />
                    </Container>
                    <Container
                      $width="50%"
                      $bgColor={selectedRecord?.alumnoId == row.alumnoId ? darkenColor('#a5fa60', 25) : theme.colors.tertiary[400]}>
                      <input
                        min={0}
                        max={10}
                        style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                        type="number"
                        step={1}
                        defaultValue={row.inasistencias.injustificadas[convertPeriodoKeyToIndex(periodo)]}
                        onChange={(event) =>
                          dispatch({
                            type: 'updateTardanzasInasistencias',
                            payload: {
                              periodo,
                              alumnoId: row.alumnoId,
                              value: +event.target.value,
                              field: 'inasistencias',
                              subfield: 'injustificadas',
                            },
                          })
                        }
                      />
                    </Container>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>{row.conducta[convertPeriodoKeyToIndex(periodo)]}</Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $width="100%"
                    $alignItems="center"
                    $justifyContent="center"
                    onClick={() => {
                      setSelectedRecord(row);
                      setShowCDModal(true);
                    }}>
                    {row.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)].length > 20 ? (
                      <FaCheck color="#1fce56" size={20} />
                    ) : (
                      <RiCloseCircleFill color="#d34030" size={20} />
                    )}
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === EVENT_NAME) {
      dispatch({ type: 'updateNotaCurso', payload: value });
    } else if (name === 'editCompetencia') {
      const { cursoKey, index, nota, periodo } = value;
      // dispatchSelectedRegistro({ type: 'updateNotasSelectedRegistroAction', payload: { nota, cursoKey, periodo } });
    }
  }
  function clickAlumnoHandle(record: RecordNotas) {
    if (selectedRecord) {
      if (selectedRecord.alumnoId == record.alumnoId) {
        return setSelectedRecord(undefined);
      }
    }
    setSelectedRecord(record);
  }
}
