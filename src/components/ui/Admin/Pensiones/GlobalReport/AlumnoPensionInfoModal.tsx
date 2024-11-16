import styled from 'styled-components';
import { AMatriculado } from '../../../../../types/alumno';
import { Container } from '../../../../shared/Container';
import Modal from '../../../../shared/Modal';
import { Text } from '../../../../shared/Text';
import { MONTHS } from '../../Calendario/EnableDays/utils';
import { getDisplayPensionCardBgColor } from '../PorSalon/components/utils';
const DivContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, max-content));
  justify-content: center;
  align-items: center;

  padding: 1.6rem 0;
  margin: 0;
  gap: 0.5rem;
`;
export default function AlumnoPensionInfoModal({ onCloseModal, selectedAlumno }: { onCloseModal; selectedAlumno: { estudiante: AMatriculado; pensiones: Pension[] } }) {
  return (
    <Modal
      onCloseModal={onCloseModal}
      width="45rem"
      title={`${selectedAlumno.estudiante.nombreCompleto + ' - ' + selectedAlumno.estudiante.grado + ' ' + selectedAlumno.estudiante.seccion}`}>
      <Container $direction="column" $gap="2.2rem" $width="100%">
        <Container $direction="column" $gap="1.6rem" $width="100%">
          <Container $direction="column" $gap="1rem" $width="100%">
            {selectedAlumno.estudiante.apoderados?.map((apoderado, index) => {
              return (
                <Container $direction="column" $gap="1rem" $width="100%" $border="1px solid black" $padding="1rem" key={index}>
                  <Text $bold $width="50%">
                    {apoderado.relacion}
                  </Text>
                  <Container $direction="row" $gap="1rem" $alignItems="center">
                    <Text $width="60%"> {apoderado.nombreCompleto}</Text>
                    <Text $width="40%">{'DNI: ' + apoderado.dni}</Text>
                  </Container>
                  <Container $direction="row" $gap="1rem" $alignItems="center">
                    <Text $width="60%">{apoderado.correo}</Text>
                    <Text $width="40%"> {'Telf.: ' + apoderado.telefono}</Text>
                  </Container>
                </Container>
              );
            })}
          </Container>
          <DivContainer>
            {selectedAlumno.pensiones.map((pension) => {
              return (
                <Container
                  key={pension.mes}
                  $width="100%"
                  $border="1px solid red"
                  $justifyContent="center"
                  $padding=".5rem"
                  $direction="column"
                  $bgColor={getDisplayPensionCardBgColor(pension, new Date().getMonth())}>
                  <p>{MONTHS[pension.mes].toUpperCase()}</p>
                  <p>PENSION: S/.{pension.monto_pagar}</p>
                  {!pension.pagado && (
                    <Container $direction="column">
                      <p>ABONADO: S/.{pension.monto_pagado}</p>
                    </Container>
                  )}
                </Container>
              );
            })}
          </DivContainer>
        </Container>
      </Container>
    </Modal>
  );
}
