import styled from 'styled-components';
import { publishEvent } from '../../utils/customEvent';
import { Text } from './Text';
import { WidthCss } from '../../types/globals';
import { Icon } from './Icon';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

// const StyledCheckbox = styled.input`
//   &[type='checkbox'] {
//     width: 20px;
//     height: 20px;
//     cursor: pointer;
//   }
// `;
const StyledCheckboxContainer = styled.div<{ $width?: WidthCss }>`
  display: flex;
  width: ${({ $width }) => ($width ? $width : '100%')};
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;
export default function CheckBox({ name, label, width, initialState }: { initialState: boolean; width: WidthCss; label: string; name: string }) {
  return (
    <StyledCheckboxContainer $width={width} onClick={() => publish(!initialState)}>
      <Text $fontSize="small">{label}</Text>
      <Icon $primary $small $pointer>
        {initialState ? <FaRegCheckSquare /> : <FaRegSquare />}
      </Icon>
    </StyledCheckboxContainer>
  );
  function publish(value: boolean) {
    publishEvent('customCheckbox', { name, value });
  }
}
