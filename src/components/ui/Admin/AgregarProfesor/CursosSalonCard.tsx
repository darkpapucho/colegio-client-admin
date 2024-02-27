import { CURSO_BOLETA_NOTA } from '../../../../types/documento';
import { Container } from '../../../shared/Container';
import { StyledInput } from '../../../shared/StyledInput';
import { Text } from '../../../shared/Text';
import { SalonProfesor } from './selectedSalonesReducer';

export default function CursoSalonOption({
  cursoInfo,
  salon,
  onSelectCursoHandler,
}: {
  salon: SalonProfesor;
  cursoInfo: CURSO_BOLETA_NOTA;
  onSelectCursoHandler: ({ salonLabel, curso: { key, label } }: { salonLabel: string; curso: { key: string; label: string } }) => void;
}) {
  return (
    <Container $direction="row" $width="18rem" key={cursoInfo.key} $center>
      <Text $bold $fontSize="small" $textAlign="right" $width="182px">
        {cursoInfo.label}
      </Text>
      <StyledInput type="checkbox" name={cursoInfo.key} onChange={() => onSelectCursoHandler({ salonLabel: salon.label, curso: { key: cursoInfo.key, label: cursoInfo.label } })} />
    </Container>
  );
}
