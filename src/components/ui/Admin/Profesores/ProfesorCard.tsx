import { Profesor } from '../../../../types/empleado';
import { Container } from '../../../shared/Container';
import { Text } from '../../../shared/Text';
import DisplayHoverMessage from '../../../shared/DisplayHoverMessage';
import { CURSOS_CODES_MAP } from '../../../../utils/var';
import { theme } from '../../../../config/styled/styled';
import { Icon } from '../../../shared/Icon';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useContext, useRef, useState } from 'react';
import { ProfesoresContext } from './Profesores';
import Select from '../../../shared/Select';
import { generateSalones, getCursosInfo, updateToken } from '../../../../utils/utils';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel, Year } from '../../../../types/enums';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { Button } from '../../../shared/Button';
import Empleado from '../../../../models/empleado';
import toaster from 'react-hot-toast';
import { queryClient } from '../../../../config/query/query';
import { fetchProfesores } from './utils';
import { errorHandler } from '../../../../utils/errorHandler';
import { StyledInput } from '../../../shared/StyledInput';
import { CiEdit } from 'react-icons/ci';
import { FiSave } from 'react-icons/fi';
import { asserts } from '../../../../utils/assert';
import { SALONES_SELECT_OPTONS } from '../../../../var/globals';
import CheckBox from '../../../shared/CheckBox';

export default function ProfesorCard({ profesor }: { profesor: Profesor }) {
  const salonesSorted = [...profesor.salones].sort((prev, curr) => {
    return curr.order > prev.order ? -1 : 1;
  });

  const { dispatch, setShowModal } = useContext(ProfesoresContext)!;
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año) as Year;
  const [locks, setLocks] = useState({ nombres: true, apellidos: true, dni: true, telefono: true });
  const [isLoading, setIsLoading] = useState(false);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  useCustomEvent('customSelect', listener);
  useCustomEvent('customCheckbox', checkboxListener);
  return (
    <Container $width="100%" $gap="1.5rem">
      <Container $direction="row" $gap="1.5rem" $width="100%">
        <Container $direction="row" $center $gap=".5rem" $width="50%" $border $padding="0 .5rem">
          <Text $bold $fontSize="small">
            Apellidos:
          </Text>
          <StyledInput $grow defaultValue={profesor.apellidos} disabled={locks.apellidos} ref={apellidosRef} />
          <Icon $primary $small $pointer>
            {locks.apellidos ? <CiEdit onClick={() => setLocks((old) => ({ ...old, apellidos: false }))} /> : <FiSave onClick={() => updateProfesorData('apellidos')} />}
          </Icon>
        </Container>

        <Container $direction="row" $center $gap=".5rem" $width="50%" $border $padding="0 .5rem">
          <Text $bold $fontSize="small">
            Nombres:
          </Text>
          <StyledInput $grow defaultValue={profesor.nombres} disabled={locks.nombres} ref={nombresRef} />
          <Icon $primary $small $pointer>
            {locks.nombres ? <CiEdit onClick={() => setLocks((old) => ({ ...old, nombres: false }))} /> : <FiSave onClick={() => updateProfesorData('nombres')} />}
          </Icon>
        </Container>
      </Container>
      <Container $direction="row" $gap="1.5rem" $width="100%">
        <Container $direction="row" $center $gap=".5rem" $width="50%" $border $padding="0 .5rem">
          <Text $bold $fontSize="small">
            DNI:
          </Text>
          <StyledInput $grow defaultValue={profesor.dni} disabled={locks.dni} ref={dniRef} />
          <Icon $primary $small $pointer>
            {locks.dni ? <CiEdit onClick={() => setLocks((old) => ({ ...old, dni: false }))} /> : <FiSave onClick={() => updateProfesorData('dni')} />}
          </Icon>
        </Container>
        <Container $direction="row" $center $gap=".5rem" $width="50%" $border $padding="0 .5rem">
          <Text $bold $fontSize="small">
            Teléfono:
          </Text>
          <StyledInput $grow defaultValue={profesor.telefono ? profesor.telefono : ''} disabled={locks.telefono} ref={telefonoRef} />
          <Icon $primary $small $pointer>
            {locks.telefono ? <CiEdit onClick={() => setLocks((old) => ({ ...old, telefono: false }))} /> : <FiSave onClick={() => updateProfesorData('telefono')} />}
          </Icon>
        </Container>
      </Container>
      <Container $direction="row" $gap="1rem" $width="100%">
        <Text $bold $fontSize="medium">
          {profesor.salones.length} {profesor.salones.length !== 1 ? ' salones:' : ' salón:'}
        </Text>
        <Select options={SALONES_SELECT_OPTONS[nivel]} label="--agregar salón--" name="addSalon" width="15rem" tiny></Select>
      </Container>
      <Container $gap=".4rem">
        {salonesSorted.map((salon) => {
          const CURSOS_OPTIONS = getCursosInfo({ nivel, grado: salon.value.grado }).map((record) => {
            return { label: record.label, value: { cursoKey: record.key, cursoLabel: record.label, salon: salon.label } };
          });
          return (
            <Container $direction="row" $gap="1.5rem" $width="100%" key={salon.label} $center $border $height="26px">
              <Container $direction="row" $width="17rem" $padding="0 5px" $center $gap="5px">
                <DisplayHoverMessage
                  width="1.5rem"
                  message={`Eliminar ${salon.label}`}
                  label={
                    <Icon $primary $pointer onClick={() => deleteSalon(salon.label)}>
                      <FaRegTrashAlt />
                    </Icon>
                  }
                />
                <CheckBox initialState={salon.tutor} width="2rem" label="Tutor" name={salon.label} />
                <Text key={salon.label} $textAlign="right" $bold $width="10.5rem">
                  {salon.label + ': '}
                </Text>
              </Container>

              <Container $direction="row" $gap="2px" $center $width="44rem">
                {salon.cursos.map((curso) => {
                  return (
                    <Container $direction="row" $border $bgColor={theme.colors.indigo[200]} $padding="0 4px" key={curso.label}>
                      <DisplayHoverMessage padding={'2px 3px'} label={CURSOS_CODES_MAP[curso.key]} message={curso.label} />
                      <DisplayHoverMessage
                        message={`Eliminar ${curso.label}`}
                        label={
                          <Icon $primary $pointer onClick={() => deleteCurso({ salonLabel: salon.label, cursoKey: curso.key })}>
                            <FaRegTrashAlt />
                          </Icon>
                        }></DisplayHoverMessage>
                    </Container>
                  );
                })}
              </Container>
              <Select width="22rem" options={CURSOS_OPTIONS} label="--agregar curso--" name="addCurso" tiny></Select>
            </Container>
          );
        })}
      </Container>
      <Container $direction="row" $center $gap="2rem">
        <Button disabled={isLoading} $primary $small $width="max-content" onClick={() => guardarCambiosProfesor(profesor)}>
          Guardar Cambios
        </Button>
        <Button disabled={isLoading} $danger $small $width="max-content" onClick={closeModal}>
          Cancelar
        </Button>
      </Container>
    </Container>
  );
  function deleteCurso({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) {
    dispatch({ type: 'deleteCursoFromSalon', payload: { cursoKey, salonLabel } });
  }
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
    setShowModal(false);
  }

  function updateProfesorData(field: 'apellidos' | 'nombres' | 'dni' | 'telefono') {
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
      }
    } catch (err) {
      errorHandler(err);
    }
  }
  function deleteSalon(salonLabel: string) {
    dispatch({ type: 'deleteSalon', payload: salonLabel });
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
}
