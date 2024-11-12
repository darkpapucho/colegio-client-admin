import { Fragment, useContext, useRef, useState } from 'react';
import { AMatriculado } from '../../../../../../types/alumno';
import { Button } from '../../../../../shared/Button';
import { Container } from '../../../../../shared/Container';
import Input from '../../../../../shared/Input';
import Modal from '../../../../../shared/Modal';
import { Text } from '../../../../../shared/Text';
import { MONTHS } from '../../../Calendario/EnableDays/utils';
import { getDisplayPensionCardBgColor } from './utils';
import { errorHandler } from '../../../../../../utils/errorHandler';
import { Pensiones } from '../../../../../../models/Pensiones';
import { updateToken } from '../../../../../../utils/utils';
import toaster from 'react-hot-toast';
import { PensionesByGradoSeccionContext } from '../PensionesByGradoSeccion';
import Loader from '../../../../Loader/Loader';
import { StyledInput } from '../../../../../shared/StyledInput';

export default function PagarPensionModal({ selectedData, onCloseModal }: { onCloseModal: () => void; selectedData: { estudiante: AMatriculado; pension: Pension } }) {
  const montoAbonadoRef = useRef<HTMLInputElement | null>(null);
  const fechaRef = useRef<HTMLInputElement | null>(null);
  const { setData } = useContext(PensionesByGradoSeccionContext)!;
  const [loading, setLoading] = useState(false);

  if (!selectedData.pension.pagado) {
    return (
      <Fragment key={loading.toString()}>
        {loading && <Loader $zIndex={200} />}
        <Modal width="36rem" title={selectedData.estudiante.nombreCompleto.toUpperCase()} onCloseModal={onCloseModal}>
          <Container $direction="column" $gap="2rem" $width="100%">
            <Text $width="100%" $textAlign="center" $bold $fontSize="small">
              PAGAR PENSIÓN
            </Text>
            <Container $direction="row" $width="max-content" $gap="1rem" $border="1px solid black">
              <Container $direction="column" $width="max-content" $bgColor="#0f0f0f" $padding="1rem" $gap="1rem" $height="8rem" $alignItems="center" $justifyContent="center">
                <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
                  {convertIndexToMonth(selectedData.pension.mes).toUpperCase()}
                </Text>
                <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
                  S/. {selectedData.pension.monto_pagar}
                </Text>
              </Container>
              <Container $direction="column" $padding="1rem" $gap="1rem" $justifyContent="center">
                <Input type="datetime-local" name="fecha" label="" ref={fechaRef} />
                <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
                  {'Abonado: S/. ' + selectedData.pension.monto_pagado}
                </Text>
              </Container>
            </Container>
            <Container $direction="row" $gap=".1rem" $alignItems="center">
              <Text $bold>S/.</Text>
              <StyledInput
                defaultValue={selectedData.pension.monto_pagar - selectedData.pension.monto_pagado}
                name="monto_abonado"
                min={0}
                type="number"
                ref={montoAbonadoRef}
                step={10}
                max={selectedData.pension.monto_pagar}
              />
            </Container>
            <Container $gap="1rem" $direction="row">
              <Button $width="max-content" $primary onClick={pagarPension} disabled={loading}>
                {' '}
                Pagar Pension
              </Button>
              <Button $width="max-content" $danger onClick={onCloseModal} disabled={loading}>
                {' '}
                Cancelar
              </Button>
            </Container>
          </Container>
        </Modal>
      </Fragment>
    );
  }
  //display informacion
  return (
    <Fragment key={loading.toString()}>
      {loading && <Loader $zIndex={200} />}
      <Modal width="36rem" title={selectedData.estudiante.nombreCompleto.toUpperCase()} onCloseModal={onCloseModal}>
        <Container $direction="column" $width="100%" $bgColor="#0f0f0f" $padding="1rem">
          <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
            {convertIndexToMonth(selectedData.pension.mes).toUpperCase()}
          </Text>
          <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
            {new Date(selectedData.pension.fecha).toLocaleDateString('es-PE', {
              timeZone: 'America/Lima',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </Text>
          <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
            {'S/. ' + selectedData.pension.monto_pagado}
          </Text>
          <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
            {'Recibo:' + selectedData.pension.reciboId ? selectedData.pension.reciboId : 'aqui falta el recibo'}
          </Text>
        </Container>
      </Modal>
    </Fragment>
  );

  function convertIndexToMonth(index: number) {
    return MONTHS[index];
  }

  async function pagarPension() {
    try {
      setLoading(true);
      const monto_abonado = Number(montoAbonadoRef.current?.value);
      const saldoPagar = Number(selectedData.pension.monto_pagar) - Number(selectedData.pension.monto_pagado);
      const fecha = fechaRef.current!.value;

      if (!fecha) throw new Error('fecha inválida');
      if (!monto_abonado || Number(monto_abonado) > saldoPagar) {
        //|| Number(monto_abonado) <= saldoPagar / 2
        throw new Error('monto inválido');
      }
      const response = await Pensiones.pagarPensionAlumnoIdMes({
        monto_pagado: selectedData.pension.monto_pagado,
        monto_abonado,
        monto_pagar: selectedData.pension.monto_pagar,
        fecha,
        mes: selectedData.pension.mes,
        alumnoId: selectedData.estudiante._id,
      });

      updateToken(response);
      if (!response.data.ok) {
        throw new Error(response.data.message);
      }
      const reciboId = response.data.payload.reciboId;
      //update table
      setData((oldData) => {
        const newData = oldData.map((record) => {
          if (record.alumnoId === selectedData.estudiante._id) {
            const newPensiones = record.pensiones.map((pension) => {
              if (pension.mes === selectedData.pension.mes) {
                pension.fecha = fecha;
                pension.monto_pagado = Number(monto_abonado) + selectedData.pension.monto_pagado;
                pension.pagado = saldoPagar - Number(monto_abonado) != 0 ? false : true;
              }
              return { ...pension, reciboId };
            });
            record.pensiones = newPensiones;
          }
          return record;
        });
        return newData;
      });
      toaster.success('pension pagada con exito');
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
      onCloseModal();
    }
  }
}
