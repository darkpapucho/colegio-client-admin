import { Container } from '../../../../shared/Container';
import PensionesGlobalReportTable from './PensionesGlobalReportTable';

export default function PensionesGlobalReport() {
  console.log({ hello: 'world' });
  return (
    <Container $direction="row" $gap="1rem" $width="100%">
      <PensionesGlobalReportTable />
    </Container>
  );
}
