import { Fragment, useContext } from 'react';
import { TbListDetails } from 'react-icons/tb';
import { Profesor } from '../../../../types/empleado';
import { Icon } from '../../../shared/Icon';
import Table from '../../Table/Table';
import { ProfesoresContext } from './Profesores';

export default function ProfesoresTable({ data }: { data: Profesor[] }) {
  const { setShowModal, dispatch } = useContext(ProfesoresContext)!;
  return (
    <Table gridTemplateColumns="15rem 15rem 7rem 5rem" width="content-fit">
      <Table.Header>
        <Table.Header.Item $padding="4px">APELLIDOS</Table.Header.Item>
        <Table.Header.Item>NOMBRES</Table.Header.Item>
        <Table.Header.Item>DNI</Table.Header.Item>
        <Table.Header.Item>DET.</Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {data.map((profesor, i) => {
          return (
            <Fragment key={profesor._id}>
              <Table.Body.Item $padding="6px" $key={i}>
                {profesor.apellidos}
              </Table.Body.Item>
              <Table.Body.Item $padding="6px" $key={i}>
                {profesor.nombres}
              </Table.Body.Item>
              <Table.Body.Item $padding="6px" $key={i}>
                {profesor.dni}
              </Table.Body.Item>
              <Table.Body.Item $padding="6px" $key={i}>
                <Icon $primary $pointer $small onClick={() => openModal(profesor)}>
                  <TbListDetails />
                </Icon>
              </Table.Body.Item>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
  function openModal(profesor: Profesor) {
    dispatch({ type: 'setProfesor', payload: profesor });
    setShowModal(true);
  }
}
