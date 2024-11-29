import { Fragment, useState } from 'react';
import { Grado, Nivel, Seccion } from '../../../../../types/enums';
import { Container } from '../../../../shared/Container';
import Table from '../../../Table/Table';
import { Text } from '../../../../shared/Text';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { MONTHS } from '../../Calendario/EnableDays/utils';
import DisplayHoverMessage from '../../../../shared/DisplayHoverMessage';

export default function RecordPensionesPagadasTable({ data }: { data: { alumno: { nombreCompleto: string; grado: Grado; seccion: Seccion }; pensiones: Pension[] }[] }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
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
      <Table withBorder gridTemplateColumns={`35rem ${nivel === 'inicial' ? '11rem' : '8rem'} 1fr`} width="content-fit">
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center">
              ALUMNO
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
                <Table.Body.Item $key={index === selectedRecord ? 2 : 1}>
                  <Container $width="100%" $padding=".3rem" $direction="row" onClick={() => handleClickAlumnoName(index)}>
                    <Text $width="3rem">{`[${index + 1}]`}</Text>
                    <Text $width="calc(100% - 3rem)" $textAlign="left">
                      {record.alumno.nombreCompleto}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRecord ? 2 : 1}>
                  <Container $width="100%" $padding=".3rem" $direction="row">
                    <Text $width="100%">
                      {record.alumno.grado} {record.alumno.seccion}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRecord ? 2 : 1}>
                  <Container $direction="row" $gap=".1rem" $width="100%" $justifyContent="flex-start">
                    {record.pensiones.map((pension, index) => {
                      return (
                        <Container $padding=".3rem" $border="1px solid black" key={index}>
                          <DisplayHoverMessage
                            label={`${MONTHS[pension.mes].toUpperCase()}-S/.${pension.monto_pagado}`}
                            message={`${new Date(pension.fecha).toLocaleDateString('es-PE', {
                              timeZone: 'America/Lima',
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`}
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
      setSelectedRecord(null);
    }
    setSelectedRecord(index);
  }
}
