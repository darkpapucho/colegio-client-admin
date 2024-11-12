import styled, { css } from 'styled-components';
import { Container } from '../../../../../shared/Container';
import { getDisplayPensionCardContent, getDisplayPensionCardBgColor } from './utils';

const DisplayPensionContainer = styled(Container)<{ $index: number }>`
  ${({ $index }) =>
    $index % 2 &&
    css`
      filter: brightness(125%);
    `}
`;

export default function DisplayPensionInfo({ pension, onClick, $index }: { $index: number; onClick: () => void; pension: Pension | undefined }) {
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
