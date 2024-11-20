import { useEffect, useState } from 'react';
import { Pensiones } from '../../../../../models/Pensiones';
import { errorHandler } from '../../../../../utils/errorHandler';
import { Container } from '../../../../shared/Container';
import { updateToken } from '../../../../../utils/utils';
import PensionesGlobalReportTable from './PensionesGlobalReportTable';

export default function PensionesGlobalReport() {
  const [data, setData] = useState<{ numeroPensionesAtrasadas: number; totalAlumnos: number }[]>([]);
  useEffect(() => {
    fetchPensionesGlobalReport();
  }, []);
  return (
    <Container $direction="column" $gap="1rem">
      <PensionesGlobalReportTable data={data} />
    </Container>
  );
  async function fetchPensionesGlobalReport() {
    try {
      const response = await Pensiones.getPensionesGlobalReport();
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      setData(response.data.payload);
    } catch (err) {
      errorHandler(err);
    }
  }
}
