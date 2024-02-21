import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';

export default function SpecialBlock({ field }: { field: string }) {
  return (
    <Container $width="100%" $direction="column" $gap="1px" $bgColor="white" $padding="0">
      <Container $width="100%" $center $bgColor={theme.colors.indigo[500]}>
        {field}
      </Container>
      <Container $width="100%" $direction="row" $bgColor="white" $gap="1px">
        <Container $width="50%" $bgColor={theme.colors.indigo[500]}>
          <div style={{ textAlign: 'center' }}>Just.</div>
        </Container>
        <Container $width="50%" $bgColor={theme.colors.indigo[500]}>
          <div style={{ textAlign: 'center' }}>Inj.</div>
        </Container>
      </Container>
    </Container>
  );
}
