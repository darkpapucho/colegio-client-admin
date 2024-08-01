import { Container } from '../../../shared/Container';
import { PensionesNavBar } from './subs/PensionesNavBar';

export default function Pensiones() {
  return (
    <Container $padding="2rem" $width="100%">
      <PensionesNavBar>
        <div>hello</div>
        <div>hello2</div>
      </PensionesNavBar>
    </Container>
  );
}
