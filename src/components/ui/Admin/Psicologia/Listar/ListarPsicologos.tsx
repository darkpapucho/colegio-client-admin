import { useEffect } from 'react';
import PsicologoModel from '../../../../../models/Psicologo';
import { errorHandler } from '../../../../../utils/errorHandler';
import { updateToken } from '../../../../../utils/utils';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import PsicologosTable from './PsicologosTable';

export default function ListarPsicologos() {
  useEffect(() => {
    fetchPsicologos();
  }, []);
  return (
    <Container $width="100%" $direction="column" $gap="2rem">
      <Text $fontSize="large" $bold>
        DEPARTAMENTO PSICOLÓGICO
      </Text>
      <PsicologosTable />
    </Container>
  );

  async function fetchPsicologos() {
    try {
      const response = await PsicologoModel.fetchPsicologos();
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      console.log(response.data.payload);
    } catch (err) {
      errorHandler(err);
    }
  }
}
