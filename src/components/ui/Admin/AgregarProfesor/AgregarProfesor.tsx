import SimpleLayout from '../../../shared/SimpleLayout';
import AgregarProfesorForm from './AgregarProfesorForm';

export default function AgregarProfesor() {
  return (
    <SimpleLayout title="Agregar nuevo profesor">
      <AgregarProfesorForm></AgregarProfesorForm>
    </SimpleLayout>
  );
}
