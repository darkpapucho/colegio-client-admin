import { useContext } from 'react';
import { theme } from '../../../../config/styled/styled';
import Documento from '../../../../models/Documento';
import { RegistroNota } from '../../../../types/documento';
import { Grado, Seccion } from '../../../../types/enums';
import { errorHandler } from '../../../../utils/errorHandler';
import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import { RegistroNotasContext } from './RegistroNotas';
import { updateToken } from '../../../../utils/utils';
import toaster from 'react-hot-toast';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import { fetchRegistroNotas } from './utils';

export default function SubmitRegistro({ copyRegistro }: { copyRegistro: RegistroNota[] }) {
  const { isLoading, setIsLoading, setData } = useContext(RegistroNotasContext)!;
  const { grado, seccion } = useGradoSeccionSearchParams();
  return (
    <Container $direction="row" $gap="1rem" $bgColor={theme.colors.secondary[200]} $padding="1rem" $width="max-content">
      <Button
        $primary
        disabled={isLoading}
        $small
        onClick={() => submitRegistro({ grado: grado as Grado, seccion: seccion as Seccion, registro: copyRegistro })}>
        Enviar Registro
      </Button>
      {/* <Button $danger $small disabled={isLoading}>
        Cancelar
      </Button> */}
    </Container>
  );
  async function submitRegistro({ grado, seccion, registro }: { grado: Grado; seccion: Seccion; registro: RegistroNota[] }) {
    try {
      setIsLoading(true);
      const response = await Documento.updateRegistroNotas({ grado, seccion, registro });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('Se guardó el registro exitosamente.');
      const data = await fetchRegistroNotas({ grado, seccion });
      setData(data);
      setIsLoading(false);
    } catch (err) {
      errorHandler(err);
      setIsLoading(false);
    }
  }
}
