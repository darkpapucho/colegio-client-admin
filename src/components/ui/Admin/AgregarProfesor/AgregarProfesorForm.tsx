import { useRef, useState } from 'react';
import { Container } from '../../../shared/Container';
import Input from '../../../shared/Input';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../types/enums';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { theme } from '../../../../config/styled/styled';
import { getCursosInfo, generateSalones, updateToken } from '../../../../utils/utils';
import { Text } from '../../../shared/Text';
import { StyledInput } from '../../../shared/StyledInput';
import { useImmerReducer } from 'use-immer';
// import CursosReducer from './cursosReducer';
import MultiSelect from '../../../shared/MultiSelect/MultiSelect.component';
import styled from 'styled-components';
import SelectedSalonesReducer, { ProfesorData, SalonProfesor } from './selectedSalonesReducer';
import { asserts } from '../../../../utils/assert';
import { errorHandler } from '../../../../utils/errorHandler';
import { User } from '../../../../models/user';
import { Button } from '../../../shared/Button';
import toaster from 'react-hot-toast';
import CursoSalonOption from './CursosSalonCard';
import SalonCard from './SalonCard';
import Loader from '../../Loader/Loader';

// const cursosInitialState: { [key: string]: boolean } = {
//   matematica: false,
//   cienciaTecnologia: false,
//   personalSocial: false,
//   educacionFisica: false,
//   comunicacion: false,
//   arteCultura: false,
//   ingles: false,
//   religion: false,
//   psicomotriz: false,
//   competenciasTransversales: false,
// };
export default function AgregarProfesorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  // const [cursos, dispatch] = useImmerReducer(CursosReducer, cursosInitialState);
  const [selectedSalones, dispatchSelectedSalones] = useImmerReducer(SelectedSalonesReducer, { selectedSalones: [] as SalonProfesor[] });
  useCustomEvent('multiSelect', multiSelectListener);
  return (
    <Container $width="max-content" $gap="2rem" $direction="column">
      {isLoading && <Loader />}
      <Container $direction="row" $width="max-content" $gap="2rem">
        <Container $gap="1rem" $padding="1rem" $height={nivel === 'primaria' ? '39rem' : '22rem'} $bgColor={theme.colors.indigo[100]} $width="36rem">
          <MultiSelect items={generateSalones(nivel)} width="34rem" name="addSalones"></MultiSelect>
        </Container>
        <Container $width="39rem" $gap="2.5rem" $padding="2.5rem 0 0 1rem">
          <Input type="text" ref={nombresRef} name="nombres" label="nombres" $width="100%"></Input>
          <Input type="text" ref={apellidosRef} name="apellidos" label="apellidos" $width="100%"></Input>
          <Input type="text" ref={dniRef} name="dni" label="dni" $width="100%"></Input>
          <Input type="text" ref={telefonoRef} name="telefono" label="telefono" $width="100%"></Input>
        </Container>
      </Container>

      {selectedSalones.selectedSalones.map((salon) => (
        <SalonCard salon={salon} key={salon.label} dispatch={dispatchSelectedSalones} onSelectCursoHandler={onSelectCursoHandler} />
      ))}
      {selectedSalones.selectedSalones.length > 0 && (
        <Button $primary $medium onClick={submitFOrm} disabled={isLoading} $center>
          Crear Profesor
        </Button>
      )}
    </Container>
  );

  function onSelectCursoHandler({ salonLabel, curso }: { salonLabel: string; curso: { label: string; key: string } }) {
    dispatchSelectedSalones({ type: 'updateCursosSalon', payload: { salonLabel, curso } });
  }
  function multiSelectListener(event: CustomEvent) {
    const { name, value }: { name: string; value: SalonProfesor[] } = event.detail;

    if (name === 'addSalones') {
      const sorted = [...value].sort((old, curr) => {
        return curr.order > old.order ? -1 : 1;
      });
      dispatchSelectedSalones({ type: 'updateSelectedSalones', payload: sorted });
    }
  }
  async function submitFOrm() {
    try {
      setIsLoading(true);
      const nombres = nombresRef.current!.value.trim().toUpperCase();
      const apellidos = apellidosRef.current!.value.trim().toUpperCase();
      const dni = dniRef.current!.value.trim();
      const telefono = telefonoRef.current!.value.trim();

      //validaciones
      asserts(nombres.length >= 4, 'nombres debe contener al menos 4 caracteres');
      asserts(apellidos.length >= 8, 'apellidos debe contener al menos 8 caracteres');
      asserts(dni.length === 8 && typeof +dni === 'number', 'DNI inválido');
      if (telefono.length > 0) {
        asserts(telefono.length === 9 && typeof +telefono === 'number', 'teléfono inválido');
      }
      //validar al menos 1 salon seleccionado
      if (selectedSalones.selectedSalones.length === 0) throw new Error('debes seleccionar al menos 1 salón para el profesor');
      const validSalones = selectedSalones.selectedSalones.filter((salon) => salon.cursos.length > 0);
      //validar q cada salon tenga al menos 1 curso seleccionado
      if (validSalones.length !== selectedSalones.selectedSalones.length) {
        throw new Error('todos los salones deben tener al menos 1 curso agregado');
      }
      //data:
      const profesorData: ProfesorData = {
        nombres,
        apellidos,
        dni: +dni,
        salones: selectedSalones.selectedSalones,
      };
      if (telefono.length > 0) profesorData.telefono = +telefono;
      const response = await User.crearProfesor(profesorData);
      updateToken(response);
      if (!response.data.ok) {
        toaster.error(response.data.message);
      } else {
        toaster.success('La operación se realizó exitosamente');
      }

      setIsLoading(false);
    } catch (err) {
      errorHandler(err);
      setIsLoading(false);
    }
  }
}
