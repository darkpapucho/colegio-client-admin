import Table from '../../Table/Table';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import { DeterminateState, convertPeriodoKeyToIndex } from './utils';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { IconBG } from './IconBG';
import { Fragment } from 'react';
import { InicialRegistroReducer } from './Table/Inicial/registroReducerInicial';
const DisplayAlumno = ({ $index, children }: { $index: number; children?: React.ReactNode }) => (
  <div
    className="flex h-full w-full cursor-pointer items-center justify-between gap-[0.4rem] px-[5px] text-white hover:text-brand-400 [&_.nombres-apellidos]:grow [&_.nombres-apellidos]:text-left"
    style={{ backgroundColor: $index % 2 === 0 ? 'hsl(228, 100%, 57%)' : 'hsl(228, 100%, 69%)' }}>
    {children}
  </div>
);

export default function TableBody({
  openAllDetailsModal,
  openConclusionesDescriptivasModal,
  copyRegistro,
  periodo,
  dispatch,
  openEditNotasModal,
  cursosMap,
}: {
  openAllDetailsModal: (record: RegistroNota) => void;
  cursosMap: CursoMap[];
  openEditNotasModal: ({ registro, cursoKey }: { cursoKey: string; registro: RegistroNota }) => void;
  openConclusionesDescriptivasModal: (registro: RegistroNota) => void;
  periodo: PeriodosKey;
  copyRegistro: RegistroNota[];
  dispatch: React.Dispatch<InicialRegistroReducer>;
}) {
  return (
    <Table.Body>
      {copyRegistro.map((registro, index) => {
        return (
          <Fragment key={registro.alumnoId}>
            <Table.Body.Item $key={index} onClick={() => openAllDetailsModal(registro)}>
              <DisplayAlumno $index={index}>
                <p>{`[${index + 1}]`}</p>
                <p className="nombres-apellidos">{registro.apellidos + ', ' + registro.nombres}</p>
              </DisplayAlumno>
            </Table.Body.Item>
            <Table.Body.Item $key={index}>{registro.estadoMatricula}</Table.Body.Item>
            {cursosMap.map((map) => {
              return (
                <Fragment key={map.key}>
                  <Table.Body.Item $key={index}>
                    <IconBG
                      onClick={() => openEditNotasModal({ registro: { ...registro }, cursoKey: map.key })}
                      $isCompleted={DeterminateState(registro.cursos[map.key][periodo])}
                      $pointer
                      $small>
                      {DeterminateState(registro.cursos[map.key][periodo]) ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    </IconBG>
                  </Table.Body.Item>
                </Fragment>
              );
            })}

            <Table.Body.Item $key={index}>
              <Container $width="100%" $direction="row" $bgColor="white" $gap="1px" $padding="0">
                <Container $width="50%" $bgColor={theme.colors.tertiary[400]}>
                  <input
                    min={0}
                    max={10}
                    style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                    type="number"
                    step={1}
                    defaultValue={registro.tardanzas.justificadas[convertPeriodoKeyToIndex(periodo)]}
                    onChange={(event) =>
                      dispatch({
                        type: 'updateTardanzasInasistencias',
                        payload: { periodo, alumnoId: registro.alumnoId, value: +event.target.value, field: 'tardanzas', subfield: 'justificadas' },
                      })
                    }
                  />
                </Container>
                <Container $width="50%" $bgColor={theme.colors.tertiary[400]}>
                  <input
                    min={0}
                    max={10}
                    style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                    type="number"
                    step={1}
                    defaultValue={registro.tardanzas.injustificadas[convertPeriodoKeyToIndex(periodo)]}
                    onChange={(event) =>
                      dispatch({
                        type: 'updateTardanzasInasistencias',
                        payload: { periodo, alumnoId: registro.alumnoId, value: +event.target.value, field: 'tardanzas', subfield: 'injustificadas' },
                      })
                    }
                  />
                </Container>
              </Container>
            </Table.Body.Item>
            <Table.Body.Item $key={index}>
              <Container $width="100%" $direction="row" $bgColor="white" $gap="1px" $padding="0">
                <Container $width="50%" $bgColor={theme.colors.tertiary[400]}>
                  <input
                    min={0}
                    max={10}
                    style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                    type="number"
                    step={1}
                    defaultValue={registro.inasistencias.justificadas[convertPeriodoKeyToIndex(periodo)]}
                    onChange={(event) =>
                      dispatch({
                        type: 'updateTardanzasInasistencias',
                        payload: {
                          periodo,
                          alumnoId: registro.alumnoId,
                          value: +event.target.value,
                          field: 'inasistencias',
                          subfield: 'justificadas',
                        },
                      })
                    }
                  />
                </Container>
                <Container $width="50%" $bgColor={theme.colors.tertiary[400]}>
                  <input
                    min={0}
                    max={10}
                    style={{ width: '4rem', height: '3rem', padding: '0 0 0 4px' }}
                    type="number"
                    step={1}
                    defaultValue={registro.inasistencias.injustificadas[convertPeriodoKeyToIndex(periodo)]}
                    onChange={(event) =>
                      dispatch({
                        type: 'updateTardanzasInasistencias',
                        payload: {
                          periodo,
                          alumnoId: registro.alumnoId,
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
            <Table.Body.Item $key={index}>
              <IconBG
                $isCompleted={registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)].length > 0}
                $pointer
                $small
                onClick={() => openConclusionesDescriptivasModal(registro)}>
                {registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)].length > 0 ? <FaCheckCircle /> : <FaExclamationTriangle />}
              </IconBG>
            </Table.Body.Item>
          </Fragment>
        );
      })}
    </Table.Body>
  );
}
