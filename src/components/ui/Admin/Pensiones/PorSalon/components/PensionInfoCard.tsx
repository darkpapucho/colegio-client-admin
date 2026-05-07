import styled, { css } from 'styled-components';
import { Container } from '../../../../../shared/Container';
import { getDisplayPensionCardContent, getDisplayPensionCardBgColor } from './utils';
import { Pension } from '../../../../../../types/pensiones';

const DisplayPensionContainer = styled(Container)<{ $index: boolean }>`
  ${({ $index }) =>
    $index &&
    css`
      filter: brightness(70%);
    `}
`;

export default function PensionInfoCard({ pension, onClick, $index }: { $index: boolean; onClick: () => void; pension: Pension | undefined }) {
  const mesActual = new Date().getMonth();
  return (
    <DisplayPensionContainer
      $index={$index}
      $pointer={!pension ? false : true}
      $width="100%"
      $bgColor={getDisplayPensionCardBgColor(pension, mesActual)}
      onClick={onClick}
      $border="1px solid gray"
      $justifyContent="center">
      {getDisplayPensionCardContent(pension, mesActual)}
    </DisplayPensionContainer>
  );
}
