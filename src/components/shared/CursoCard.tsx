import { FaRegTrashAlt } from 'react-icons/fa';
import { theme } from '../../config/styled/styled';
import { Container } from './Container';
import DisplayHoverMessage from './DisplayHoverMessage';
import { Icon } from './Icon';

export default function CursoCard({
  curso,
  salonLabel,
  deleteCurso,
}: {
  deleteCurso: ({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) => void;
  curso: { label: string; key: string; code: string; short: string };
  salonLabel: string;
}) {
  return (
    <Container $direction="row" $border="1px solid black" $bgColor={theme.colors.secondary[200]} $padding="0 4px" key={curso.label} $width="5rem">
      <DisplayHoverMessage padding={'2px 3px'} label={curso.code} message={curso.label} />
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
