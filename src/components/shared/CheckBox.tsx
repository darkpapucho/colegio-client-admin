import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { publishEvent } from '../../utils/customEvent';
import { Text } from './Text';
import { WidthCss } from '../../types/globals';
const StyledCheckbox = styled.input`
  &[type='checkbox'] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
const StyledCheckboxContainer = styled.div<{ $width?: WidthCss }>`
  display: flex;
  width: ${({ $width }) => ($width ? $width : '100%')};
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;
export default function CheckBox({ name, label, width, initialState }: { initialState: boolean; width: WidthCss; label: string; name: string }) {
  const [isChecked, setIsChecked] = useState<boolean>(initialState);
  useEffect(() => {
    publish(isChecked);
  }, [isChecked]);

  return (
    <StyledCheckboxContainer $width={width}>
      <Text $fontSize="small">{label}</Text>
      <StyledCheckbox type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
    </StyledCheckboxContainer>
  );
  function publish(value: boolean) {
    publishEvent('customCheckbox', { name, value });
  }
}
