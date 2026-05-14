import { Fragment, useRef, useState } from 'react';
import { AtrasoPensionDetailModal } from '../../../../../types/pensiones';
import { Container } from '../../../../shared/Container';
import Modal from '../../../../shared/Modal';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { MONTHS } from '../../Calendario/EnableDays/utils';
import calcularMoraPension from '../PorSalon/components/utils';
import TextArea from '../../../../shared/TextArea';
import { Button } from '../../../../shared/Button';
import { errorHandler } from '../../../../../utils/errorHandler';
import { Pensiones } from '../../../../../models/Pensiones';
import { updateToken } from '../../../../../utils/utils';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Grado, Nivel, Seccion } from '../../../../../types/enums';
import useGradoSeccionSearchParams from '../../../../../hooks/useGradoSeccionSearchParams';
import { queryClient } from '../../../../../config/query/query';

export default function AtrasoDetailModal({ detail, onCloseModal }: { detail: AtrasoPensionDetailModal; onCloseModal: () => void }) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { grado, seccion } = useGradoSeccionSearchParams();
  const [_, setLoading] = useState(false);
  return (
    <Modal width="100rem" onCloseModal={onCloseModal} title={detail.nombreCompleto}>
      <Container $width="100%" $direction="column" $gap="1rem">
        <Container $direction="row" $gap="2rem" $width="100%">
          <Container $direction="column" $gap="2rem" $width="40%">
            <Text $bold $fontSize="medium">
              PENSIONES ATRASADAS: {detail.totalMesesAtraso}
            </Text>
            <Text $bold $fontSize="medium">
              TOTAL DEUDA: S/.{' '}
              {detail.mesesAtrasoDetalle.reduce((acc, row) => acc + row.monto_pagar - row.monto_pagado + calcularMoraPension(row.mes), 0).toFixed(2)}
            </Text>
            {detail.mesesAtrasoDetalle.map((row, index) => {
              return (
                <Container key={index} $direction="row" $gap="1rem">
                  <Table gridTemplateColumns="10rem 8rem 8rem 8rem" width="content-fit" withBorder>
                    <Table.Header>
                      <Table.Header.Item>
                        <Text $fontSize="small">MES</Text>
                      </Table.Header.Item>
                      <Table.Header.Item>
                        <Text $fontSize="small">DEUDA</Text>
                      </Table.Header.Item>
                      <Table.Header.Item>
                        <Text $fontSize="small">ABONADO</Text>
                      </Table.Header.Item>
                      <Table.Header.Item>
                        <Text $fontSize="small">MORA</Text>
                      </Table.Header.Item>
                    </Table.Header>
                    <Table.Body>
                      <Table.Body.Item>
                        <Text $fontSize="small">{MONTHS[row.mes].toUpperCase()}</Text>
                      </Table.Body.Item>
                      <Table.Body.Item>
                        <Text $fontSize="small">{`S/. ${row.monto_pagar.toFixed(2)}`}</Text>
                      </Table.Body.Item>
                      <Table.Body.Item>
                        <Text $fontSize="small">{`S/. ${row.monto_pagado.toFixed(2)}`}</Text>
                      </Table.Body.Item>
                      <Table.Body.Item>
                        <Text $fontSize="small">{`S/. ${calcularMoraPension(row.mes).toFixed(2)}`}</Text>
                      </Table.Body.Item>
                    </Table.Body>
                  </Table>
                </Container>
              );
            })}
          </Container>
          <Container $direction="column" $gap="2rem" $width="60%">
            <Container $direction="column" $width="100%" $gap=".2rem">
              <Text $bold $fontSize="medium">
                CONTACTOS
              </Text>
              {detail.apoderados && detail.apoderados.length > 0 ? (
                <Table gridTemplateColumns="28rem 10rem 10rem" width="content-fit" withBorder>
                  <Table.Header>
                    <Table.Header.Item>
                      <Text $fontSize="small">NOMBRE</Text>
                    </Table.Header.Item>
                    <Table.Header.Item>
                      <Text $fontSize="small">TELEFONO</Text>
                    </Table.Header.Item>
                    <Table.Header.Item>
                      <Text $fontSize="small">PARENTESCO</Text>
                    </Table.Header.Item>
                    <Table.Body>
                      {detail.apoderados.map((apoderado, index) => {
                        return (
                          <Fragment key={index}>
                            <Table.Body.Item>
                              <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px">
                                <Text $fontSize="small">{apoderado.nombreCompleto}</Text>
                              </Container>
                            </Table.Body.Item>
                            <Table.Body.Item>
                              <Text $fontSize="small">{apoderado.telefono}</Text>
                            </Table.Body.Item>
                            <Table.Body.Item>
                              <Text $fontSize="small">{apoderado.relacion}</Text>
                            </Table.Body.Item>
                          </Fragment>
                        );
                      })}
                    </Table.Body>
                  </Table.Header>
                </Table>
              ) : (
                <Text>No se encontraron apoderados</Text>
              )}
            </Container>
            <Container $direction="column" $gap=".2rem" $width="100%">
              <Text $bold $fontSize="medium">
                {`OBSERVACIÓN: ${detail.ultimoCobro ? new Date(detail.ultimoCobro.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Sin registro de cobros'}`}
              </Text>
              <TextArea ref={textAreaRef} defaultValue={detail.ultimoCobro ? detail.ultimoCobro.detalle : 'sin cobro'}></TextArea>
              <Button $primary $width="max-content" onClick={guardarObservacion}>
                Guardar
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </Modal>
  );
  async function guardarObservacion() {
    try {
      setLoading(true);
      const detalle = textAreaRef.current?.value || '';
      const fecha = new Date();

      console.log({ detalle, fecha });
      const response = await Pensiones.cobrarPension({
        detalle,
        fecha,
        alumnoId: detail._id,
      });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['pensiones-atrasados', nivel, grado, seccion] });
      alert('Observación guardada correctamente');
      queryClient.prefetchQuery({
        queryKey: ['pensiones-atrasados', nivel, grado, seccion],
        queryFn: async () => {
          const response = await Pensiones.fetchAtrasadosList({ grado: grado as Grado, seccion: seccion as Seccion });
          updateToken(response);
          if (!response.data.ok) throw new Error(response.data.message);
          return response.data.payload;
        },
      });
      setLoading(false);
      onCloseModal();
    } catch (err) {
      setLoading(false);
      errorHandler(err);
    }
  }
}
