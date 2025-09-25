import { useContext } from 'react';
import { theme } from '../../../../config/styled/styled';
import Documento from '../../../../models/Documento';
import { RegistroNota } from '../../../../types/documento';
import { Grado, Nivel, Seccion } from '../../../../types/enums';
import { errorHandler } from '../../../../utils/errorHandler';
import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import { RegistroNotasContext } from './RegistroNotas';
import { updateToken } from '../../../../utils/utils';
import toaster from 'react-hot-toast';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import { fetchRegistroNotas } from './utils';
import { RecordNotas } from '../../../../types/notas';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import Notas from '../../../../models/Notas';
import { AxiosResponse } from 'axios';
import { ResponseSchema } from '../../../../types/axiosResponse';
import { asserts } from '../../../../utils/assert';

export default function SubmitRegistro({ copyRegistro }: { copyRegistro: RegistroNota[] | RecordNotas[] }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
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
  async function submitRegistro({ grado, seccion, registro }: { grado: Grado; seccion: Seccion; registro: RegistroNota[] | RecordNotas[] }) {
    try {
      setIsLoading(true);
      let response: AxiosResponse<ResponseSchema<null>, any> | undefined = undefined;
      if (nivel === 'inicial') {
        response = await Documento.updateRegistroNotas({ grado, seccion, registro: registro as RegistroNota[] });
        updateToken(response!);
        if (!response.data.ok) throw new Error(response.data.message);
        toaster.success('Se guardó el registro exitosamente.');
        const data = await fetchRegistroNotas({ grado, seccion });
        setData(data);
      } else if (nivel === 'primaria') {
        response = await Notas.updateRecordNotasPrimaria({ registro: registro as RecordNotas[] });
        updateToken(response!);
        if (!response.data.ok) throw new Error(response.data.message);
        toaster.success('Se guardó el registro exitosamente.');
        const res = await Notas.getNotasByGradoSeccion({ grado, seccion });
        updateToken(res);
        if (!res.data.ok) throw new Error(res.data.message);

        setData(res.data.payload.registroNotas);
      }
      asserts(response != undefined, 'response is undefined');
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
}
