import { BiPencil } from 'react-icons/bi';
import Table from '../../Table/Table';
import { Icon } from '../../../shared/Icon';
import { PeriodosKey, RegistroNota } from '../../../../types/documento';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Container } from '../../../shared/Container';
import SelectNota from './EditNotaButton';
import { theme } from '../../../../config/styled/styled';
import { EVENT_NAME, convertPeriodoKeyToIndex } from './utils';
import { CopyRegistroReducer } from './registroReducer';

export default function TableBody({
  setShowModal,
  setSelectedRegistro,
  copyRegistro,
  periodo,
  dispatch,
}: {
  setSelectedRegistro: Dispatch<SetStateAction<{ alumnoId: string; alumnoNombre: string; defaultValue: string } | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  periodo: PeriodosKey;
  copyRegistro: RegistroNota[];
  dispatch: React.Dispatch<CopyRegistroReducer>;
}) {
  console.log('registro table blody rendered');
  console.log({ periodo, copyRegistro });
  return (
    <Table.Body>
      {copyRegistro.map((registro, index) => {
        return (
          <Fragment key={registro.alumnoId}>
            <Table.Body.Item $key={index}>{registro.apellidos + ', ' + registro.nombres}</Table.Body.Item>
            <Table.Body.Item $key={index}>{registro.estadoMatricula}</Table.Body.Item>
            {Object.keys(registro.cursos).map((curso) => {
              return (
                <Fragment>
                  <Table.Body.Item $key={index}>
                    <SelectNota notas={registro.cursos[curso][periodo]} cursoKey={curso} periodo={periodo} name={EVENT_NAME} alumnoId={registro.alumnoId} />
                  </Table.Body.Item>
                </Fragment>
              );
            })}
            {/* {cursosMap.map((curso) => {
              return (
                <Fragment key={curso.key}>
                  <Table.Body.Item $key={index}>
                    <SelectNota registro={registro} cursoKey={curso.key} periodo={periodo} name={EVENT_NAME} />
                  </Table.Body.Item>
                </Fragment>
              );
            })} */}
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
              <Icon
                $primary
                $interactive
                $small
                $pointer
                onClick={() => {
                  setSelectedRegistro({
                    alumnoId: registro.alumnoId,
                    alumnoNombre: registro.apellidos + ', ' + registro.nombres,
                    defaultValue: registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)],
                  });
                  setShowModal(true);
                }}>
                <BiPencil />
              </Icon>
            </Table.Body.Item>
          </Fragment>
        );
      })}
    </Table.Body>
  );
}
