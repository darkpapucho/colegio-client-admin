import { FaRegTrashAlt } from 'react-icons/fa';
import { theme } from '../../config/styled/styled';
import { CURSOS_CODES_MAP } from '../../utils/var';
import { Container } from './Container';
import DisplayHoverMessage from './DisplayHoverMessage';
import { Icon } from './Icon';

export default function CursoCard({
  curso,
  salonLabel,
  deleteCurso,
}: {
  deleteCurso: ({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) => void;
  curso: { label: string; key: string };
  salonLabel: string;
}) {
  return (
    <Container $direction="row" $border $bgColor={theme.colors.indigo[200]} $padding="0 4px" key={curso.label}>
      <DisplayHoverMessage padding={'2px 3px'} label={CURSOS_CODES_MAP[curso.key]} message={curso.label} />
      <DisplayHoverMessage
        message={`Eliminar ${curso.label}`}
        label={
          <Icon $primary $pointer onClick={() => deleteCurso({ salonLabel: salonLabel, cursoKey: curso.key })}>
            <FaRegTrashAlt />
          </Icon>
        }></DisplayHoverMessage>
    </Container>
  );
}
