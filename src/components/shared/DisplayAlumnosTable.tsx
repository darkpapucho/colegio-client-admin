import { Fragment } from 'react';
import { AMatriculado } from '../../types/alumno';
import Table from '../ui/Table/Table';
import { Icon } from './Icon';

import { ErrorMessage } from './ErrorMessage';
import { convertGradoToIndex } from '../../utils/convertGradoToIndex';
import { Container } from './Container';

export default function DisplayAlumnosTable({
  alumnos,
  icon,
  // setShowModal,
  // setSelectedAlumno,
  actionHandler,
}: {
  // setSelectedAlumno: React.Dispatch<React.SetStateAction<AMatriculado | undefined>>;
  // setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  actionHandler: (alumno: AMatriculado) => void;
  alumnos: AMatriculado[] | undefined;
  icon: JSX.Element;
}) {
  if (!alumnos) return <></>;
  return (
    <Table gridTemplateColumns="26rem 10rem 5.5rem" width="fit-content">
      {alumnos.length > 0 ? (
        <Table.Header>
          <Table.Header.Item $padding="6px 3px">Alumno</Table.Header.Item>
          {/* <Table.Header.Item $padding="6px 3px">DNI</Table.Header.Item>
          <Table.Header.Item $padding="6px 3px">Est. Matrícula</Table.Header.Item> */}
          <Table.Header.Item $padding="6px 3px">Grado</Table.Header.Item>
          <Table.Header.Item $padding="6px 3px"> Action</Table.Header.Item>
        </Table.Header>
      ) : null}
      {alumnos.length > 0 ? (
        <Table.Body>
          {[...alumnos]
            .sort((prev, curr) => (convertGradoToIndex(prev.grado) > convertGradoToIndex(curr.grado) ? 1 : -1))
            .map((alumno, index) => (
              <Fragment key={index}>
                <Table.Body.Item $key={index} $padding="4px">
                  <Container $justifyContent="flex-end" $width="100%" $alignItems="center">
                    {alumno.nombreCompleto}
                  </Container>
                </Table.Body.Item>
                {/* <Table.Body.Item $key={index} $padding="4px">
                {alumno.dni}
              </Table.Body.Item>
              <Table.Body.Item $key={index} $padding="4px">
                {alumno.estadoMatricula}
              </Table.Body.Item> */}
                <Table.Body.Item $key={index} $padding="4px">
                  {alumno.grado + ' ' + alumno.seccion}{' '}
                </Table.Body.Item>
                <Table.Body.Item $key={index} $padding="4px">
                  <Icon $primary $pointer $small onClick={() => actionHandler(alumno)}>
                    {icon}
                  </Icon>
                </Table.Body.Item>
              </Fragment>
            ))}
        </Table.Body>
      ) : (
        <ErrorMessage message="no hubo resultados" align="center"></ErrorMessage>
      )}
    </Table>
  );
}
