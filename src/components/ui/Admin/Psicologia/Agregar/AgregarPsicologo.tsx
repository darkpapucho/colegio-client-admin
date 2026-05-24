import { useState, useRef } from 'react';
import FormularioDatos from '../../../../shared/Formulario/FormularioDatos';
import SimpleLayout from '../../../../shared/SimpleLayout';
import Loader from '../../../Loader/Loader';
import { Button } from '../../../../shared/Button';
import { errorHandler } from '../../../../../utils/errorHandler';
import PsicologoModel from '../../../../../models/Psicologo';
import toaster from 'react-hot-toast';
import { updateToken } from '../../../../../utils/utils';
import { assertDni } from '../../../../../utils/assert';

export default function AgregarPsicologo() {
  const [isLoading, setIsLoading] = useState(false);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);
  return (
    <SimpleLayout title="Agregar psicólogo">
      {isLoading && <Loader />}
      <FormularioDatos nombresRef={nombresRef} apellidosRef={apellidosRef} dniRef={dniRef} telefonoRef={telefonoRef} correoRef={correoRef} />
      <Button $primary $width="max-content" onClick={() => handleAgregarPsicologo()} disabled={isLoading}>
        Agregar
      </Button>
    </SimpleLayout>
  );

  async function handleAgregarPsicologo() {
    try {
      setIsLoading(true);
      const nombres = nombresRef.current?.value || '';
      const apellidos = apellidosRef.current?.value || '';
      const dni = dniRef.current?.value || '';
      const telefono = telefonoRef.current?.value || '';
      const correo = correoRef.current?.value || '';
      if (!nombres || !apellidos || !dni) throw new Error('nombres, apellidos y dni son campos obligatorios');
      assertDni(dni);
      const response = await PsicologoModel.agregarNuevoPsicologo({ nombres, apellidos, dni, telefono, correo });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      if (!response.data.payload) throw new Error('NO SE PUDO AGREGAR NUEVO PSICÓLOGO');
      toaster.success('se agregó el nuevo psicólogo');
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
}
