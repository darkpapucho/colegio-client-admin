import { Fragment, useContext } from 'react';
import { TbListDetails } from 'react-icons/tb';
import { Profesor } from '../../../../types/empleado';
import { Icon } from '../../../shared/Icon';
import Table from '../../Table/Table';
import { ProfesoresContext } from '../../../shared/Profesor/ProfesorContext';
import { FaTrash } from 'react-icons/fa';
import { errorHandler } from '../../../../utils/errorHandler';
import Empleado from '../../../../models/empleado';
import { updateToken } from '../../../../utils/utils';
import { queryClient } from '../../../../config/query/query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { fetchProfesores } from './utils';
import toaster from 'react-hot-toast';
export default function ProfesoresTable({ data }: { data: Profesor[] }) {
  const nivel = useTypedSelector((state) => state.nivel);
  const año = useTypedSelector((state) => state.año);
  const { setShowModal, dispatch } = useContext(ProfesoresContext)!;
  return (
    <Table gridTemplateColumns="15rem 15rem 7rem 5rem 5rem" width="content-fit">
      <Table.Header>
        <Table.Header.Item $padding="4px">APELLIDOS</Table.Header.Item>
        <Table.Header.Item>NOMBRES</Table.Header.Item>
        <Table.Header.Item>DNI</Table.Header.Item>
        <Table.Header.Item>DET.</Table.Header.Item>
        <Table.Header.Item>DEL.</Table.Header.Item>
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
              <Table.Body.Item $padding="6px" $key={i}>
                <Icon $color="red" $pointer $small onClick={() => handleDeleteProfesor(profesor)}>
                  <FaTrash />
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
  async function handleDeleteProfesor(profesor: Profesor) {
    if (!window.confirm(`seguro que deseas eliminar al profesor ${profesor.apellidos} ${profesor.nombres}?`)) return;
    try {
      const response = await Empleado.deleteProfesor(profesor.userId);
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['profesores', nivel, año] });
      queryClient.prefetchQuery({ queryKey: ['profesores', nivel, año], queryFn: fetchProfesores });
      toaster.success('profesor eliminado');
    } catch (err) {
      errorHandler(err);
    }
  }
}
