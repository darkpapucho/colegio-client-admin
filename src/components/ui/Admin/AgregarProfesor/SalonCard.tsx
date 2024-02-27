import { Dispatch } from 'react';
import { theme } from '../../../../config/styled/styled';
import { getCursosInfo } from '../../../../utils/utils';
import { Container } from '../../../shared/Container';
import { GridContainer } from '../../../shared/GridContainer';
import { StyledInput } from '../../../shared/StyledInput';
import { Text } from '../../../shared/Text';
import CursoSalonOption from './CursosSalonCard';
import { SalonProfesor, SelectedSalonesAction } from './selectedSalonesReducer';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../types/enums';

export default function SalonCard({
  salon,
  dispatch,
  onSelectCursoHandler,
}: {
  onSelectCursoHandler: ({ salonLabel, curso: { key, label } }: { salonLabel: string; curso: { key: string; label: string } }) => void;
  dispatch: Dispatch<SelectedSalonesAction>;
  salon: SalonProfesor;
}) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  return (
    <Container $direction="column" $padding="0 0 1rem 0" $gap="1rem" $width="100%" key={salon.label} $border>
      <Container $direction="row" $gap="2rem" $center $bgColor={theme.colors.indigo[200]} $padding=".6rem">
        <Text $bold $fontSize="medium">
          {salon.label}
        </Text>
        <Container $direction="row" $width="18rem">
          <Text $fontSize="medium" $textAlign="right" $width="182px">
            Tutoría
          </Text>
          <StyledInput type="checkbox" onChange={() => dispatch({ type: 'toggleTotoria', payload: salon.label })} />
        </Container>
      </Container>

      <GridContainer $width="100%">
        {getCursosInfo({ nivel, grado: salon.value.grado }).map((cursoInfo) => {
          return <CursoSalonOption salon={salon} cursoInfo={cursoInfo} onSelectCursoHandler={onSelectCursoHandler} key={cursoInfo.key} />;
        })}
      </GridContainer>
    </Container>
  );
}
