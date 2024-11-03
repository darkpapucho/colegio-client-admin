// import { useState } from 'react';
import { theme } from '../../../../config/styled/styled';
import { Container } from '../../../shared/Container';
import Select from '../../../shared/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import FilterGradoSeccion from '../../../shared/FilterGradoSeccion';
import { AMatriculado } from '../../../../types/alumno';
import DisplayAlumnosTable from '../../../shared/DisplayAlumnosTable';
import { BiCheckCircle } from 'react-icons/bi';
import SelectedAlumnoModal from './SelectedAlumnoModal';
import { Button } from '../../../shared/Button';
// import { errorHandler } from '../../../../utils/errorHandler';
// import Documento from '../../../../models/Documento';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
// import { updateToken } from '../../../../utils/utils';
import { useImmerReducer } from 'use-immer';
import { BoletaNotasReducer } from './reducer';
import { onCloseModal, requestBoletasSalon, requestSingleBoleta } from './utils';
import EstadosMatriculaBox from '../../../shared/EstadosMatriculaBox';
import { EstadoMatricula } from '../../../../types/enums';
import { useState } from 'react';
import { Title } from '../../../shared/Title';

const OPTIONS = [
  { label: 'salón', value: 'salon' },
  { label: 'individual', value: 'individual' },
];

export default function BoletaNotas() {
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();

  const [{ mode, loading, alumnos, showModal, selectedAlumno }, dispatch] = useImmerReducer(BoletaNotasReducer, {
    mode: 'salon',
    loading: false,
    alumnos: undefined,
    showModal: false,
    selectedAlumno: undefined,
  });

  const [showEstadosMatriculaBox, setShowEstadosMatriculaBox] = useState(true);

  useCustomEvent('customSelect', selectListener);
  return (
    <Container $direction="column" $height="max-content" $width="100%" $gap="1rem">
      <Title>Boleta de Notas</Title>
      {showModal && selectedAlumno && (
        <SelectedAlumnoModal selectedAlumno={selectedAlumno} onCloseModal={() => onCloseModal(dispatch)}>
          <Button $primary $small onClick={() => requestSingleBoleta({ dispatch, selectedAlumno })} $width="100%" disabled={loading}>
            Emitir Boleta de Notas
          </Button>
          <Button $width="100%" $danger $small onClick={() => onCloseModal(dispatch)} disabled={loading}>
            Cancelar
          </Button>
        </SelectedAlumnoModal>
      )}
      <Container $alignItems="center" $direction="row" $gap="1rem" $padding="0.5rem" $bgColor={theme.colors.secondary[200]} $width="max-content" $height="44px">
        <Select name="modo" defaultValue={OPTIONS[0]} options={OPTIONS} width="11rem" tiny label="modo"></Select>
        {showEstadosMatriculaBox && <EstadosMatriculaBox setSearchParams={setSearchParams} />}
      </Container>

      {mode === 'individual' && <SearchAlumnoBox handler={searchAlumnosBoxHandler} width="30rem" />}
      {mode === 'salon' && (
        <FilterGradoSeccion
          isLoading={loading}
          handler={() => requestBoletasSalon({ zipped: true, dispatch, grado, seccion, estadosMatricula: searchParams.get('estadosMatricula')?.split('-') as EstadoMatricula[] })}
          buttonLabel="Generar Libretas"
        />
      )}
      {mode === 'individual' && <DisplayAlumnosTable alumnos={alumnos} actionHandler={actionHandler} icon={<BiCheckCircle />}></DisplayAlumnosTable>}
    </Container>
  );

  //TODO: update all SearchALumnoBox to its new handler
  function searchAlumnosBoxHandler(alumnos: AMatriculado[]) {
    dispatch({ type: 'updateAlumnosResult', payload: alumnos });
  }
  function actionHandler(alumno: AMatriculado) {
    dispatch({ type: 'openSelectedAlumnoModal', payload: alumno });
  }
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    console.log({ name, value });
    if (name === 'modo') {
      // setModo(value);
      if (value === 'salon') {
        setShowEstadosMatriculaBox(true);
      } else if (value === 'individual') {
        setShowEstadosMatriculaBox(false);
      }
      dispatch({ type: 'changeMode', payload: value });
    }
  }
}
