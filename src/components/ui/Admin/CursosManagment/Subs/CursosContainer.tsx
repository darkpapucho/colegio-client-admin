import { CURSO } from '../../../../../types/cursos/types';
import { Container } from '../../../../shared/Container';
import CursoCard from './CursoCard';

export default function CursosContainer({ onDelete, cursos }: { onDelete: (curso: CURSO) => void; cursos: CURSO[] | null }) {
  if (!cursos) return <>Empty</>;
  return (
    <Container $direction="column" $bgColor="white">
      {cursos.map((curso) => (
        <CursoCard onDelete={onDelete} curso={curso} key={curso.key} />
      ))}
    </Container>
  );
}
