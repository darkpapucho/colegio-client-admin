import SimpleLayout from '../../../shared/SimpleLayout';
import AgregarProfesorForm from './AgregarProfesorForm';

export default function AgregarProfesor() {
  return (
    <SimpleLayout title="Agregar nuevo profesor">
      {/* <Container $direction="row" $gap="1rem">
        <Select options={grados[nivel]} name="grado" label="grado" tiny width="16rem"></Select>
        <Select options={sections} name="seccion" label="seccion" tiny width="16rem"></Select>
      </Container> */}
      <AgregarProfesorForm></AgregarProfesorForm>
    </SimpleLayout>
  );
}
