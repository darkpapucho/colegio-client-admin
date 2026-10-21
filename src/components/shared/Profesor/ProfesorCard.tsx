import { Profesor } from '../../../types/empleado';
import { Container } from '../Container';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { useContext, useRef, useState } from 'react';
import Select from '../Select';
import { generateSalones, updateToken } from '../../../utils/utils';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Nivel, Year } from '../../../types/enums';
import useCustomEvent from '../../../hooks/useCustomEvent';
import { Button } from '../Button';
import Empleado from '../../../models/empleado';
import toaster from 'react-hot-toast';
import { queryClient } from '../../../config/query/query';
import { fetchProfesores } from '../../ui/Admin/Profesores/utils';
import { errorHandler } from '../../../utils/errorHandler';
import { StyledInput } from '../StyledInput';
import { CiEdit } from 'react-icons/ci';
import { FiSave } from 'react-icons/fi';
import { assertCorreo, asserts } from '../../../utils/assert';
import { SALONES_SELECT_OPTONS } from '../../../var/globals';
import SalonCard from '../SalonCard';
import { ProfesoresContext } from './ProfesorContext';
import { User } from '../../../models/user';

export default function ProfesorCard({ profesor }: { profesor: Profesor }) {
  const salonesSorted = [...profesor.salones].sort((prev, curr) => {
    return curr.order > prev.order ? -1 : 1;
  });

  const { dispatch, setShowModal } = useContext(ProfesoresContext)!;
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año) as Year;
  const [locks, setLocks] = useState({ nombres: true, apellidos: true, dni: true, telefono: true, correo: true });
  const [isLoading, setIsLoading] = useState(false);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);
  useCustomEvent('customSelect', listener);
  useCustomEvent('customCheckbox', checkboxListener);
  return (
    <Container $direction="column" $gap="2rem" $width="100%">
      <Container $direction="column" $gap="1.5rem" $width="100%">
        {/* <Container $direction="row" $alignItems="center" $gap=".5rem" $width="50%" $border="1px solid #CBD5E1" $padding="0 .5rem"> */}
        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $bold $fontSize="small">
            Apellidos:
          </Text>
          <StyledInput $grow defaultValue={profesor.apellidos} disabled={locks.apellidos} ref={apellidosRef} />
          <Icon $primary $small $pointer>
            {locks.apellidos ? (
              <CiEdit onClick={() => setLocks((old) => ({ ...old, apellidos: false }))} />
            ) : (
              <FiSave onClick={() => updateProfesorData('apellidos')} />
            )}
          </Icon>
        </Container>
        {/* </Container> */}

        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $bold $fontSize="small" $width="6rem">
            Nombres:
          </Text>
          <StyledInput $grow defaultValue={profesor.nombres} disabled={locks.nombres} ref={nombresRef} />
          <Icon $primary $small $pointer>
            {locks.nombres ? (
              <CiEdit onClick={() => setLocks((old) => ({ ...old, nombres: false }))} />
            ) : (
              <FiSave onClick={() => updateProfesorData('nombres')} />
            )}
          </Icon>
        </Container>

        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $bold $fontSize="small" $width="6rem">
            DNI:
          </Text>
          <StyledInput $grow defaultValue={profesor.dni} disabled={locks.dni} ref={dniRef} />
          <Icon $primary $small $pointer>
            {locks.dni ? <CiEdit onClick={() => setLocks((old) => ({ ...old, dni: false }))} /> : <FiSave onClick={() => updateProfesorData('dni')} />}
          </Icon>
        </Container>
        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $bold $fontSize="small" $width="6rem">
            Teléfono:
          </Text>
          <StyledInput $grow defaultValue={profesor.telefono ? profesor.telefono : ''} disabled={locks.telefono} ref={telefonoRef} />
          <Icon $primary $small $pointer>
            {locks.telefono ? (
              <CiEdit onClick={() => setLocks((old) => ({ ...old, telefono: false }))} />
            ) : (
              <FiSave onClick={() => updateProfesorData('telefono')} />
            )}
          </Icon>
        </Container>
        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $bold $fontSize="small" $width="6rem">
            Correo:
          </Text>
          <StyledInput $grow defaultValue={profesor.correo} disabled={locks.correo} ref={correoRef} />
          <Icon $primary $small $pointer>
            {locks.correo ? <CiEdit onClick={() => setLocks((old) => ({ ...old, correo: false }))} /> : <FiSave onClick={() => updateProfesorData('correo')} />}
          </Icon>
        </Container>
      </Container>

      <Container $direction="row" $gap="1rem" $width="100%">
        <Text $bold $fontSize="medium">
          {profesor.salones.length} {profesor.salones.length !== 1 ? ' salones:' : ' salón:'}
        </Text>
        <Select options={SALONES_SELECT_OPTONS[nivel]} label="--agregar salón--" name="addSalon" width="15rem" tiny></Select>
      </Container>
      <Container $gap=".4rem" $direction="column" $width="100%">
        {salonesSorted.map((salon) => {
          return <SalonCard salon={salon} deleteSalon={deleteSalon} deleteCurso={deleteCurso} key={salon.label} />;
        })}
      </Container>
      <Container $direction="row" $alignItems="center" $gap="2rem">
        <Button disabled={isLoading} $primary $small $width="max-content" onClick={() => guardarCambiosProfesor(profesor)}>
          Guardar Cambios
        </Button>
        <Button
          disabled={isLoading}
          $secondary
          $small
          $width="max-content"
          onClick={() => resetProfesorPassword({ dni: profesor.dni, userId: profesor.userId })}>
          Reset Password
        </Button>
        <Button disabled={isLoading} $danger $small $width="max-content" onClick={closeModal}>
          Cancelar
        </Button>
      </Container>
    </Container>
  );
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'addCurso') {
      dispatch({ type: 'addCursoToSalon', payload: value });
    }
    if (name === 'addSalon') {
      const salon = generateSalones(nivel).find((salon) => salon.label === value);

      dispatch({ type: 'addSalon', payload: salon! });
    }
  }
  function closeModal() {
    setShowModal ? setShowModal(false) : null;
  }
  async function resetProfesorPassword({ userId, dni }: { userId: string; dni: number }) {
    if (!window.confirm(`Estas seguro que deseas resetear el password de ${profesor.apellidos}, ${profesor.nombres}`)) return;
    try {
      setIsLoading(true);
      const response = await User.resetProfesorPassword({ dni, userId });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('se reseteo el password');
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
  function updateProfesorData(field: 'apellidos' | 'nombres' | 'dni' | 'telefono' | 'correo') {
    try {
      if (field === 'apellidos') {
        const value = apellidosRef.current!.value;
        dispatch({ type: 'updateProfesorData', payload: { value, field } });
        setLocks((old) => ({ ...old, [field]: true }));
      } else if (field === 'nombres') {
        const value = nombresRef.current!.value;
        dispatch({ type: 'updateProfesorData', payload: { value, field } });
        setLocks((old) => ({ ...old, [field]: true }));
      } else if (field === 'dni') {
        const value = dniRef.current!.value;
        asserts(value.length === 8 && typeof +value === 'number', 'DNI inválido');
        dispatch({ type: 'updateProfesorData', payload: { value, field } });
        setLocks((old) => ({ ...old, [field]: true }));
      } else if (field === 'telefono') {
        const value = telefonoRef.current!.value;
        asserts(value === '' || (value.length === 9 && typeof +value === 'number'), 'Teléfono inválido');
        dispatch({ type: 'updateProfesorData', payload: { value, field } });
        setLocks((old) => ({ ...old, [field]: true }));
      } else if (field === 'correo') {
        const value = correoRef.current!.value;
        assertCorreo(value);
        dispatch({ type: 'updateProfesorData', payload: { value, field } });
        setLocks((old) => ({ ...old, [field]: true }));
      }
    } catch (err) {
      errorHandler(err);
    }
  }

  function checkboxListener(event: CustomEvent) {
    const { name, value } = event.detail;
    dispatch({ type: 'updateTutoria', payload: { salon: name, value } });
  }

  async function guardarCambiosProfesor(profesor: Profesor) {
    if (!window.confirm('Se modificará la información permanentemente, ¿estás seguro de continuar?')) return;
    try {
      setIsLoading(true);
      const response = await Empleado.updateProfesor(profesor);
      updateToken(response);
      if (response.data.ok) {
        queryClient.invalidateQueries({ queryKey: ['profesores', nivel, año] });
        queryClient.prefetchQuery({ queryKey: ['profesores', nivel, año], queryFn: fetchProfesores });
        toaster.success('se guardaron los cambios exitosamente');
      }
      setIsLoading(false);
      closeModal();
    } catch (err) {
      errorHandler(err);
      setIsLoading(false);
    }
  }
  function deleteSalon(salonLabel: string) {
    dispatch({ type: 'deleteSalon', payload: salonLabel });
  }
  function deleteCurso({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) {
    dispatch({ type: 'deleteCursoFromSalon', payload: { cursoKey, salonLabel } });
  }
}
