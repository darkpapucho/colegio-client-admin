import { Container } from '../../../../../shared/Container';
import { getDisplayPensionCardContent, getDisplayPensionCardBgColor } from './utils';

export default function DisplayPensionInfo({ pension, onClick }: { onClick: () => void; pension: Pension | undefined }) {
  const mesActual = new Date().getMonth();
  return (
    <Container
      $pointer={!pension ? false : true}
      $width="100%"
      $bgColor={getDisplayPensionCardBgColor(pension, mesActual)}
      onClick={onClick}
      $border="1px solid gray"
      $justifyContent="center">
      {getDisplayPensionCardContent(pension, mesActual)}
    </Container>
  );
}
