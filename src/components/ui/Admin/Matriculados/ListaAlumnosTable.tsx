import { Fragment } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import Filter from '../../Filter/Filter';
import Table from '../../Table/Table';
import { ErrorMessage } from '../../../shared/ErrorMessage';
import { EstadoMatricula } from '../../../../types/enums';
import { CiEdit } from 'react-icons/ci';
import { Icon } from '../../../shared/Icon';
import useEstadoMatriculaFilter from '../../../../hooks/useAlumnosFilter';
import { Container } from '../../../shared/Container';

const estados: { label: EstadoMatricula | 'TODOS'; value: EstadoMatricula | 'TODOS' }[] = [
  { label: 'TODOS', value: 'TODOS' },
  { label: 'DEFINITIVA', value: 'DEFINITIVA' },
  { label: 'PENDIENTE', value: 'PENDIENTE' },
  { label: 'TRASLADADO', value: 'TRASLADADO' },
];
const headers = ['ALUMNO', <Filter name="estadoMatricula" label="ESTADO" options={estados} width="10rem"></Filter>, 'DNI', 'GRADO', 'SECCIÓN', 'EDIT'];

export default function ListaAlumnosTable({
  alumnos,
  setSelectedAlumno,
  setShowModal,
}: {
  alumnos: AMatriculado[] | undefined;
  setSelectedAlumno: React.Dispatch<React.SetStateAction<AMatriculado | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const matriculadosFiltered = useEstadoMatriculaFilter({ records: alumnos });

  return (
    <>
      {matriculadosFiltered && (
        <Table width="content-fit" gridTemplateColumns="35rem  14rem 10rem 12rem 10rem 5rem" withBorder>
          <Table.Header>
            {headers.map((item, index) => (
              <Table.Header.Item key={index}>{item}</Table.Header.Item>
            ))}
          </Table.Header>

          {matriculadosFiltered.length > 0 ? (
            <Table.Body>
              {matriculadosFiltered.map((matriculado, i) => (
                <Fragment key={i}>
                  <Table.Body.Item $key={i}>
                    <Container $direction="row" $width="100%" $gap=".5rem" $padding="0 0 0 .5rem">
                      <div>{`[${i + 1}]`}</div>
                      <div>{matriculado.nombreCompleto}</div>
                    </Container>
                  </Table.Body.Item>
                  <Table.Body.Item $key={i}>{matriculado.estadoMatricula}</Table.Body.Item>
                  <Table.Body.Item $key={i}>{matriculado.dni == '' ? matriculado.codigoEstudiante : matriculado.dni}</Table.Body.Item>
                  <Table.Body.Item $key={i}>{matriculado.grado}</Table.Body.Item>
                  <Table.Body.Item $key={i}>{matriculado.seccion}</Table.Body.Item>
                  <Table.Body.Item $key={i} $padding="2px 0">
                    <Icon
                      $primary
                      $interactive
                      $pointer
                      $small
                      onClick={() => {
                        setSelectedAlumno(matriculado);
                        setShowModal(true);
                      }}>
                      <CiEdit />
                    </Icon>
                  </Table.Body.Item>
                </Fragment>
              ))}
            </Table.Body>
          ) : (
            <ErrorMessage align="center" message={'este salón no tiene alumnos'} />
          )}
        </Table>
      )}
    </>
  );
}
