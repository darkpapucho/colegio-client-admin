import { grados, SECCIONES_SELECT_OPTIONS } from '../../utils/var';
import Filter from '../ui/Filter/Filter';
import { Button } from './Button';
import { Container } from './Container';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { theme } from '../../config/styled/styled';
export default function FilterGradoSeccion({ handler, isLoading, buttonLabel }: { buttonLabel?: string; isLoading: boolean; handler: () => void }) {
  const nivel = useTypedSelector((state) => state.nivel);
  return (
    <Container $direction="row" $gap="1rem" $width="max-content" $bgColor={theme.colors.secondary[200]} $padding="1rem">
      <Filter options={grados[nivel]} name="grado" label="grado" width="12rem"></Filter>
      <Filter options={SECCIONES_SELECT_OPTIONS} name="seccion" label="sección" width="7rem" />
      <Button $primary $width="max-contentt" disabled={isLoading} onClick={() => handler()}>
        {buttonLabel ? buttonLabel : 'Buscar'}
      </Button>
    </Container>
  );
}
