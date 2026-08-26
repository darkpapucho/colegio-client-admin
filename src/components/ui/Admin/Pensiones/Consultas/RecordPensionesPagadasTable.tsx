import { Fragment, useState } from 'react';
import { Nivel } from '../../../../../types/enums';
import { Container } from '../../../../shared/Container';
import Table from '../../../Table/Table';
import { Text } from '../../../../shared/Text';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { MONTHS } from '../../Calendario/EnableDays/utils';
import DisplayHoverMessage from '../../../../shared/DisplayHoverMessage';
import { getRecordBgColor } from './utils';
import { theme } from '../../../../../config/styled/styled';
import { recortarNombres } from '../../../../../utils/utils';
import { ConsultaPensionResult } from '../../../../../models/Pensiones';

export default function RecordPensionesPagadasTable({ data }: { data: ConsultaPensionResult[] }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const estimadoPagosNoRecibidos = estimarPagosNoRecibidos();

  if (data.length === 0) {
    return (
      <Text $width="100%" $color="red" $bold $fontSize="medium" $textAlign="center">
        SIN RESULTADOS
      </Text>
    );
  }
  return (
    <Container $direction="column" $width="100%" $gap="2rem">
      <Container $direction="row" $width="100%">
        <Text $bold $fontSize="medium">
          TOTAL: S/.
        </Text>
        <Text $bold $fontSize="medium" $color="red">
          {data.reduce((acc, curr) => {
            const subTotal = curr.pensiones.reduce((acc, curr) => acc + curr.monto_pagado, 0);
            return acc + subTotal;
          }, 0)}
        </Text>
      </Container>
      <Container>
        <Text $bold $fontSize="medium">
          Estimado pagos no recibidos: S/.
        </Text>
        <Text $bold $fontSize="medium" $color="red">
          {estimadoPagosNoRecibidos}
        </Text>
      </Container>
      <Table withBorder gridTemplateColumns={`38rem 10rem ${nivel === 'inicial' ? '13rem' : '10rem'} 1fr`} width="content-fit">
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center">
              ALUMNO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center">
              DNI
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $justifyContent="center" $padding=".5rem">
              GRADO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $justifyContent="center" $padding=".5rem">
              PENSIONES PAGADAS
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {data.map((record, index) => {
            return (
              <Fragment key={index}>
                <Table.Body.Item>
                  <Container
                    $width="100%"
                    $padding=".3rem"
                    $direction="row"
                    onClick={() => handleClickAlumnoName(index)}
                    $bgColor={
                      index === selectedRecord ? theme.colors.red[100] : getRecordBgColor({ grado: record.alumno.grado, seccion: record.alumno.seccion })
                    }>
                    <Text $width="3rem">{`[${index + 1}]`}</Text>
                    <Text $width="calc(100% - 3rem)" $textAlign="left">
                      {record.alumno.nombreCompleto.split(',')[0] + ', ' + recortarNombres(record.alumno.nombreCompleto.split(',')[1])}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $width="100%"
                    $padding=".3rem"
                    $direction="row"
                    onClick={() => handleClickAlumnoName(index)}
                    $bgColor={
                      index === selectedRecord ? theme.colors.red[100] : getRecordBgColor({ grado: record.alumno.grado, seccion: record.alumno.seccion })
                    }>
                    <Text $width="100%" $textAlign="center">
                      {record.alumno.dni ?? ''}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $width="100%"
                    $padding=".3rem"
                    $direction="row"
                    $bgColor={
                      index === selectedRecord ? theme.colors.red[100] : getRecordBgColor({ grado: record.alumno.grado, seccion: record.alumno.seccion })
                    }>
                    <Text $width="100%">
                      {record.alumno.grado} {record.alumno.seccion}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $direction="row"
                    $gap=".1rem"
                    $width="100%"
                    $justifyContent="flex-start"
                    $bgColor={
                      index === selectedRecord ? theme.colors.red[100] : getRecordBgColor({ grado: record.alumno.grado, seccion: record.alumno.seccion })
                    }>
                    s
                    {record.pensiones.map((pension, index) => {
                      return (
                        <Container $padding=".3rem" $border="1px solid black" key={index} $width="13rem" $bgColor={pension.monto_pagado == 0 ? '#ee1515' : ''}>
                          <DisplayHoverMessage
                            color={pension.monto_pagado == 0 ? 'white' : 'black'}
                            width="100%"
                            label={`${MONTHS[pension.mes].toUpperCase()}-S/.${pension.monto_pagado}`}
                            message={`${new Date(pension.fecha).toLocaleDateString('es-PE', {
                              timeZone: 'America/Lima',
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })} [${pension.issuerApellidos?.toLocaleUpperCase() || 'NO REGISTRADO'}]`}
                          />
                        </Container>
                      );
                    })}
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
  function handleClickAlumnoName(index: number) {
    if (index === selectedRecord) {
      return setSelectedRecord(null);
    }
    setSelectedRecord(index);
  }
  function estimarPagosNoRecibidos() {
    const precioPensio = nivel == 'inicial' ? 170 : nivel == 'primaria' ? 180 : 220;
    const numberoPensiones = data.reduce((acc, curr) => {
      const num = curr.pensiones.reduce((ack, current) => {
        if (current.monto_pagado == 0) {
          return ack + 1;
        }
        return ack;
      }, 0);
      return acc + num;
    }, 0);
    return numberoPensiones * 180;
  }
}
