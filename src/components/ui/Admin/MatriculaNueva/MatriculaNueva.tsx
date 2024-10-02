import { Container } from '../../../shared/Container';
import { Title } from '../../../shared/Title';
import MatriculaNuevaForm from './MatriculaNuevaForm';
export default function MatriculaNueva() {
  return (
    <Container $direction="column" $height="max-content" $width="100%" $gap="1rem">
      <Title>Nueva matrícula</Title>
      <MatriculaNuevaForm />
    </Container>
  );
}
