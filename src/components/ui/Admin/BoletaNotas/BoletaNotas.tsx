// import { useState } from 'react';
import { theme } from '../../../../config/styled/styled';
import { Container } from '../../../shared/Container';
import Select from '../../../shared/Select';
import SimpleLayout from '../../../shared/SimpleLayout';
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

const OPTIONS = [
  { label: 'salón', value: 'salon' },
  { label: 'individual', value: 'individual' },
];

export default function BoletaNotas() {
  const { grado, seccion } = useGradoSeccionSearchParams();

  const [{ mode, loading, alumnos, showModal, selectedAlumno }, dispatch] = useImmerReducer(BoletaNotasReducer, {
    mode: 'salon',
    loading: false,
    alumnos: undefined,
    showModal: false,
    selectedAlumno: undefined,
  });

  // const [modo, setModo] = useState<'individual' | 'salon'>('salon');
  // const [alumnosResult, setAlumnosResult] = useState<AMatriculado[] | undefined>(undefined);
  // const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [showModal, setShowModal] = useState<boolean>(false);

  useCustomEvent('customSelect', listener);
  return (
    <SimpleLayout title="Boleta de Notas">
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
      <Container $direction="row" $gap="1rem" $padding="1rem" $bgColor={theme.colors.indigo[200]} $width="13rem">
        <Select name="modo" defaultValue={OPTIONS[0]} options={OPTIONS} width="11rem" tiny label="modo"></Select>
      </Container>
      {mode === 'individual' && <SearchAlumnoBox handler={searchAlumnosBoxHandler} width="30rem" />}
      {mode === 'salon' && <FilterGradoSeccion isLoading={loading} handler={() => requestBoletasSalon({ dispatch, grado, seccion })} buttonLabel="Generar Libretas" />}
      {mode === 'individual' && <DisplayAlumnosTable alumnos={alumnos} actionHandler={actionHandler} icon={<BiCheckCircle />}></DisplayAlumnosTable>}
    </SimpleLayout>
  );

  //TODO: update all SearchALumnoBox to its new handler
  function searchAlumnosBoxHandler(alumnos: AMatriculado[]) {
    dispatch({ type: 'updateAlumnosResult', payload: alumnos });
  }
  function actionHandler(alumno: AMatriculado) {
    dispatch({ type: 'openSelectedAlumnoModal', payload: alumno });
  }
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'modo') {
      // setModo(value);
      dispatch({ type: 'changeMode', payload: value });
    }
  }
}
