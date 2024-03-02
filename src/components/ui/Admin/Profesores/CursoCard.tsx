import { FaRegTrashAlt } from 'react-icons/fa';
import { theme } from '../../../../config/styled/styled';
import { CURSOS_CODES_MAP } from '../../../../utils/var';
import { Container } from '../../../shared/Container';
import DisplayHoverMessage from '../../../shared/DisplayHoverMessage';
import { Icon } from '../../../shared/Icon';
import { useContext } from 'react';
import { ProfesoresContext } from './Profesores';

export default function CursoCard({ curso, salonLabel }: { curso: { label: string; key: string }; salonLabel: string }) {
  const { dispatch } = useContext(ProfesoresContext)!;
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
  function deleteCurso({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) {
    dispatch({ type: 'deleteCursoFromSalon', payload: { cursoKey, salonLabel } });
  }
}
