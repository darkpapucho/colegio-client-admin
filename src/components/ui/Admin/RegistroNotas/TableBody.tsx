import Table from '../../Table/Table';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import { DeterminateState, convertPeriodoKeyToIndex } from './utils';
import { CopyRegistroReducer } from './registroReducer';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { IconBG } from './IconBG';
import { Fragment } from 'react';
import styled from 'styled-components';
const DisplayAlumno = styled.div<{ $index: number }>`
  color: white;
  cursor: pointer;
  background-color: ${({ $index }) => {
    if ($index % 2 === 0) {
      return 'hsl(228, 100%, 57%)';
    } else {
      return 'hsl(228, 100%, 69%)';
    }
  }};

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 5px;
  gap: 0.4rem;

  .nombres-apellidos {
    flex-grow: 1;
    text-align: left;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.orange[400]};
  }
`;

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
  dispatch: React.Dispatch<CopyRegistroReducer>;
}) {
  return (
    <Table.Body>
      {copyRegistro.map((registro, index) => {
        return (
          <Fragment key={registro.alumnoId}>
            <Table.Body.Item $key={index} onClick={() => openAllDetailsModal(registro)}>
              <DisplayAlumno $index={index}>
                <p>{`[${index}]`}</p>
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
                <Container $width="50%" $bgColor={theme.colors.gray[400]} $center>
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
                <Container $width="50%" $bgColor={theme.colors.gray[400]} $center>
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
                <Container $width="50%" $bgColor={theme.colors.gray[400]} $center>
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
                        payload: { periodo, alumnoId: registro.alumnoId, value: +event.target.value, field: 'inasistencias', subfield: 'justificadas' },
                      })
                    }
                  />
                </Container>
                <Container $width="50%" $bgColor={theme.colors.gray[400]} $center>
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
                        payload: { periodo, alumnoId: registro.alumnoId, value: +event.target.value, field: 'inasistencias', subfield: 'injustificadas' },
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
