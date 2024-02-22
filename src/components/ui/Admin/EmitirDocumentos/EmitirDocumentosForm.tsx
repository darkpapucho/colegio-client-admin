import { useEffect, useRef, useState } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import AlumnoCard from '../../../shared/AlumnoCard';
import { Container } from '../../../shared/Container';
import Input from '../../../shared/Input';
import SelectDocumentosBox from './SelectDocumentosBox';
import { theme } from '../../../../config/styled/styled';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../../config/query/query';
import { handleRequestDocuments } from './utils';
import { SelectedDocuments } from '../../../../types/globals';
import useErrorHandler from '../../../../hooks/useErrorHandler';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import Select from '../../../shared/Select';
import { Button } from '../../../shared/Button';
import { GradosDestino } from '../../../../var/globals';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

export default function EmitirDocumentosForm({ selectedAlumno, onCloseModal }: { selectedAlumno: AMatriculado; onCloseModal: () => void }) {
  const nivel = useTypedSelector((state) => state.nivel);
  const colegioDestinoRef = useRef<HTMLInputElement | null>(null);
  const codigoModularRef = useRef<HTMLInputElement | null>(null);
  const fechaEmisionRef = useRef<HTMLInputElement | null>(null);
  const [gradoDestino, setGradoDestino] = useState<string>('');
  const [selectedDocuments, setSelectedDocuments] = useState<SelectedDocuments>({
    resolucionTraslado: false,
    certificadoNoAdeudo: false,
    certificadoConducta: false,
  });
  const {
    error,
    isError,
    isSuccess,
    refetch,
    isFetching: isLoading,
    data,
  } = useQuery({
    queryKey: [QueryKeys.EmitirDocumentos],
    enabled: false,
    queryFn: () =>
      handleRequestDocuments({
        colegioDestinoRef,
        codigoModularRef,
        fechaEmisionRef,
        gradoDestino,
        selectedDocuments,
        alumno: selectedAlumno,
      }),
  });
  useErrorHandler({ isError, error });
  useCustomEvent('customCheckbox', customCheckboxListener);
  useCustomEvent('customSelect', customSelectListener);
  useEffect(() => {
    if (isSuccess) {
      const fileURL = URL.createObjectURL(data);
      const alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = `${selectedAlumno!.nombreCompleto}.pdf`;
      alink.click();
      alink.remove();
    }
  }, [isSuccess]);
  return (
    <Container $width="100%" $direction="column" $gap="2rem">
      <Container $direction="row" $width="100%">
        <AlumnoCard selectedAlumno={selectedAlumno} width="60%" />
        <SelectDocumentosBox width="40%" />
      </Container>
      <Container $width="100%" $gap="2rem">
        <Input label="Colegio Destino" name="colegioDestino" type="text" $width="100%" ref={colegioDestinoRef}></Input>
        <Input label="Código Modular" name="codigoModular" type="text" $width="100%" ref={codigoModularRef}></Input>
        <Container $width="100%" $bgColor={theme.colors.indigo[100]}>
          <Input label="Fecha Emision" name="fechaEmision" type="date" $width="100%" ref={fechaEmisionRef}></Input>
        </Container>

        <Select name="gradoDestino" label="Grado Destino" options={GradosDestino[nivel]} width="20rem" small></Select>
      </Container>
      <Container $width="100%" $gap="1rem">
        <Button disabled={isLoading} $primary $small onClick={() => refetch()}>
          Emitir Documentos
        </Button>
        <Button disabled={isLoading} $danger $small onClick={onCloseModal}>
          Cancelar
        </Button>
      </Container>
    </Container>
  );

  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'gradoDestino') {
      setGradoDestino(value);
    }
  }
  function customCheckboxListener(event: CustomEvent) {
    const { name, value } = event.detail;
    setSelectedDocuments((old) => ({ ...old, [name]: value }));
  }
}
