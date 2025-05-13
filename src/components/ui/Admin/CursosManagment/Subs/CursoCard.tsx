import { FaTrash } from 'react-icons/fa';
import { CURSO } from '../../../../../types/cursos/types';

import { Container } from '../../../../shared/Container';

export default function CursoCard({ curso, onDelete }: { curso: CURSO; onDelete: (curso: CURSO) => void }) {
  return (
    <Container
      $direction="row"
      $gap="1rem"
      $alignItems="center"
      $border="1px solid black"
      $width="16rem"
      $padding="2px 6px"
      $justifyContent="space-between">
      <p>{curso.label}</p>
      <Container $pointer $width="20px" $justifyContent="flex-end">
        <FaTrash color="red" onClick={onDelete.bind(null, curso)} />
      </Container>
    </Container>
  );
}
