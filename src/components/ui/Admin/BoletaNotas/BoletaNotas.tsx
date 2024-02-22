import { useState } from 'react';
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
import { errorHandler } from '../../../../utils/errorHandler';
import Documento from '../../../../models/Documento';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import { updateToken } from '../../../../utils/utils';

const OPTIONS = [
  { label: 'individual', value: 'individual' },
  { label: 'salón', value: 'salon' },
];

export default function BoletaNotas() {
  const { grado, seccion } = useGradoSeccionSearchParams();
  const [modo, setModo] = useState<'individual' | 'salon'>('salon');
  const [alumnosResult, setAlumnosResult] = useState<AMatriculado[] | undefined>(undefined);
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useCustomEvent('customSelect', listener);
  return (
    <SimpleLayout title="Boleta de Notas">
      {showModal && selectedAlumno && (
        <SelectedAlumnoModal selectedAlumno={selectedAlumno} onCloseModal={onCloseModal}>
          <Button $primary $small onClick={() => requestSingleBoleta()} $width="100%" disabled={isLoading}>
            Emitir Boleta de Notas
          </Button>
          <Button $width="100%" $danger $small onClick={onCloseModal} disabled={isLoading}>
            Cancelar
          </Button>
        </SelectedAlumnoModal>
      )}
      <Container $direction="row" $gap="1rem" $padding="1rem" $bgColor={theme.colors.indigo[200]} $width="13rem">
        <Select name="modo" defaultValue={OPTIONS[1]} options={OPTIONS} width="11rem" tiny label="modo"></Select>
      </Container>
      {modo === 'individual' && <SearchAlumnoBox handler={setAlumnosResult} width="30rem" />}
      {modo === 'salon' && <FilterGradoSeccion isLoading={isLoading} handler={requestBoletasSalon} buttonLabel="Generar Libretas" />}
      {modo === 'individual' && (
        <DisplayAlumnosTable alumnos={alumnosResult} setSelectedAlumno={setSelectedAlumno} setShowModal={setShowModal} icon={<BiCheckCircle />}></DisplayAlumnosTable>
      )}
    </SimpleLayout>
  );
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'modo') {
      setModo(value);
    }
  }

  async function requestSingleBoleta() {
    try {
      setIsLoading(true);
      const response = await Documento.emitirBoletaNotasIndividual({ alumnoId: selectedAlumno!._id });
      updateToken(response);
      const myBlob = new Blob([response.data]);
      const fileUrl = URL.createObjectURL(myBlob);
      const aLink = document.createElement('a');
      aLink.href = fileUrl;
      aLink.download = `Boleta ${selectedAlumno?.nombreCompleto}.pdf`;
      aLink.click();
      aLink.remove();
      setIsLoading(false);
    } catch (err) {
      errorHandler(err);
      setIsLoading(false);
    }
  }
  async function requestBoletasSalon() {
    // console.log({ grado, seccion });
    try {
      setIsLoading(true);
      // if (!grado || !seccion) throw new Error('Debes indicar un grado y una sección.');
      const response = await Documento.emitirBoletasNotasGradoSeccion({ grado, seccion });
      updateToken(response);
      const myBlob = new Blob([response.data]);
      const fileURL = URL.createObjectURL(myBlob);
      const alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = `Boletas ${grado}-${seccion}.pdf`;
      alink.click();
      alink.remove();
      setIsLoading(false);
    } catch (err) {
      errorHandler(err);
      setIsLoading(false);
    }
  }
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(undefined);
  }
}
