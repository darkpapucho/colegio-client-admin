import { useImmerReducer } from 'use-immer';
import SimpleLayout from '../../../shared/SimpleLayout';
// import AgregarProfesorForm from './AgregarProfesorForm';
import toaster from 'react-hot-toast';
import { Container } from '../../../shared/Container';
import { Text } from '../../../shared/Text';
import { SALONES_SELECT_OPTONS } from '../../../../var/globals';
import { Button } from '../../../shared/Button';
import Select from '../../../shared/Select';
import { useState, useRef } from 'react';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../types/enums';
import { assertCorreo, asserts } from '../../../../utils/assert';
import { errorHandler } from '../../../../utils/errorHandler';
import { generateSalones, updateToken } from '../../../../utils/utils';
import SalonCard from '../../../shared/SalonCard';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import Input from '../../../shared/Input';
import SalonesReducer from './SalonesReducer';
import { User } from '../../../../models/user';
import { SalonProfesor, ProfesorData } from '../../../shared/Profesor/types';
import { queryClient } from '../../../../config/query/query';
import { fetchProfesores } from '../Profesores/utils';

export default function AgregarProfesor() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año);
  const [state, dispatch] = useImmerReducer(SalonesReducer, { salones: [] as SalonProfesor[] });

  const salonesSorted = [...state.salones].sort((prev, curr) => {
    return curr.order > prev.order ? -1 : 1;
  });

  const SALONES_OPTIONS = SALONES_SELECT_OPTONS[nivel].filter((option) => {
    console.log({ option });
    return !salonesSorted.some((salon) => salon.label === option.value); //18-04-2025 changed option.label for option.value
  });

  const [isLoading, setIsLoading] = useState(false);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);
  useCustomEvent('customSelect', selectListener);
  useCustomEvent('customCheckbox', checkboxListener);
  return (
    <SimpleLayout title="Agregar nuevo profesor">
      {/* <AgregarProfesorForm></AgregarProfesorForm> */}
      <Container $width="max-content" $gap="3rem" $direction="column">
        <Container $width="30rem" $gap="1.8rem" $direction="column">
          <Input label="Apellidos" ref={apellidosRef} name="apellidos" type="text" $width="100%"></Input>
          <Input label="Nombres" ref={nombresRef} name="nombres" type="text" $width="100%"></Input>
          <Input label="DNI" ref={dniRef} name="dni" type="text" $width="100%"></Input>
          <Input label="Teléfono" ref={telefonoRef} name="telefono" type="text" $width="100%"></Input>
          <Input label="Correo" ref={correoRef} name="correo" type="text" $width="100%"></Input>
        </Container>
        {nivel != 'inicial' && (
          <>
            <Container $direction="row" $gap="1rem" $width="100%">
              <Text $bold $fontSize="medium">
                {state.salones.length} {state.salones.length !== 1 ? ' salones:' : ' salón:'}
              </Text>
              <Select options={SALONES_OPTIONS} label="--agregar salón--" name="addSalon" width="15rem" tiny></Select>
            </Container>
            <Container $gap=".4rem" $direction="column" $width="max-content">
              {salonesSorted.map((salon) => {
                return <SalonCard salon={salon} deleteSalon={deleteSalon} deleteCurso={deleteCurso} key={salon.label} />;
              })}
            </Container>
          </>
        )}
        <Container $direction="row" $alignItems="center" $gap="2rem">
          <Button disabled={isLoading} $primary $small $width="max-content" onClick={() => submitFOrm()}>
            Crear Profesor
          </Button>
          {/* <Button disabled={isLoading} $danger $small $width="max-content" onClick={closeModal}>
          Cancelar
        </Button> */}
        </Container>
      </Container>
    </SimpleLayout>
  );
  //TODO: agregar salones para los profesores de incial con los cursos que corresponden
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'addCurso') {
      dispatch({ type: 'addCursoToSalon', payload: value });
    }
    if (name === 'addSalon') {
      const salonesGenerados = generateSalones(nivel);

      const salon = salonesGenerados.find((row) => {
        return row.label === value;
      });

      dispatch({ type: 'addSalon', payload: salon! });
    }
  }

  function checkboxListener(event: CustomEvent) {
    const { name, value } = event.detail;
    dispatch({ type: 'updateTutoria', payload: { salon: name, value } });
  }

  function deleteSalon(salonLabel: string) {
    dispatch({ type: 'deleteSalon', payload: salonLabel });
  }
  function deleteCurso({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) {
    dispatch({ type: 'deleteCursoFromSalon', payload: { cursoKey, salonLabel } });
  }
  async function submitFOrm() {
    if (!window.confirm('Estas seguro de agregar un nuevo profesor a la base de datos?')) return;
    try {
      setIsLoading(true);
      const nombres = nombresRef.current!.value.trim().toUpperCase();
      const apellidos = apellidosRef.current!.value.trim().toUpperCase();
      const dni = dniRef.current!.value.trim();
      const telefono = telefonoRef.current!.value.trim();
      const correo = correoRef.current!.value.trim();
      const profesorData: ProfesorData = {
        nombres,
        apellidos,
        dni: dni,
        correo,
        telefono: telefono.length > 0 ? +telefono : undefined,
      };
      //validaciones
      asserts(nombres.length >= 4, 'nombres debe contener al menos 4 caracteres');
      asserts(apellidos.length >= 8, 'apellidos debe contener al menos 8 caracteres');
      asserts(dni.length === 8 && typeof +dni === 'number', 'DNI inválido');
      if (telefono.length > 0) profesorData.telefono = +telefono;
      assertCorreo(correo);
      if (telefono.length > 0) {
        asserts(telefono.length === 9 && typeof +telefono === 'number', 'teléfono inválido');
      }
      //validar al menos 1 salon seleccionado
      if (nivel != 'inicial' && state.salones.length === 0) throw new Error('debes seleccionar al menos 1 salón para el profesor');
      // if (state.salones.length === 0) throw new Error('debes seleccionar al menos 1 salón para el profesor');

      if (nivel != 'inicial' && state.salones.length > 0) {
        const validSalones = state.salones.filter((salon) => salon.cursos.length > 0);
        if (validSalones.length !== state.salones.length) {
          throw new Error('todos los salones deben tener al menos 1 curso agregado');
        }
        profesorData.salones = state.salones;
      }
      //validar q cada salon tenga al menos 1 curso seleccionado

      //data:

      const response = await User.crearProfesor(profesorData);
      updateToken(response);
      if (!response.data.ok) {
        toaster.error(response.data.message);
      } else {
        toaster.success('La operación se realizó exitosamente');
      }
      queryClient.invalidateQueries({ queryKey: ['profesores', nivel, año] });
      queryClient.prefetchQuery({ queryKey: ['profesores', nivel, año], queryFn: fetchProfesores });
      setIsLoading(false);
    } catch (err) {
      errorHandler(err);
      setIsLoading(false);
    }
  }
}
