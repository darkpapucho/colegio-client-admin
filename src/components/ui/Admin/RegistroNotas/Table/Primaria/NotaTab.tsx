import { Container } from '../../../../../shared/Container';
import { PrimariaRegistroReducer } from './registroReducerPrimaria';
import { PeriodosKey } from '../../../../../../types/documento';
import { useState } from 'react';
import { convertNumberToLetra, getColorsByNota } from './utils';
import styled from 'styled-components';
import { Text } from '../../../../../shared/Text';

const NotaText = styled.p<{ $color: string }>`
  width: 100%;
  text-align: center;
  color: ${({ $color }) => $color};
`;

const NotaContainer = styled(Container)`
  border: 1px solid #cacaca;
  border-right: none;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
    width: 100%;
    outline: none;
    text-align: center;
  }
`;

// const NotaInput = styled.input`
//   -moz-appearance: none; /* Firefox */
//   appearance: none;

//   -webkit-appearance: none; /* WebKit browsers */
//   margin: 0;
//   width: 100%;
//   outline: none;
// `;

export default function NotaTab({
  initValue,
  dispatch,
  cursoKey,
  alumnoId,
  periodo,
}: {
  initValue: number;
  dispatch: React.Dispatch<PrimariaRegistroReducer>;
  cursoKey: string;
  alumnoId: string;
  periodo: PeriodosKey;
}) {
  const [value, setValue] = useState<number>(initValue);
  const { bgColor } = getColorsByNota(value);
  return (
    <Container $width="100%" $alignItems="center" $direction="row">
      <NotaContainer $width="50%" $justifyContent="center" $bgColor="white">
        <input type="number" inputMode="numeric" min={0} max={20} onChange={handleChange} value={value}></input>
      </NotaContainer>
      <Container $width="50%" $justifyContent="center" $alignItems="center" $border="1px solid #cacaca" $bgColor={'#f8f8f8'}>
        <NotaText $color={bgColor}>{convertNumberToLetra(value)}</NotaText>
      </Container>
    </Container>
  );
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.currentTarget.value;

    let value = +rawValue.replace('0', '');

    if (value > 20) {
      value = 20;
    }
    if (value < 0) {
      value = 0;
    }

    dispatch({ type: 'updateNotaCurso', payload: { nota: value, alumnoId, cursoKey, periodo } });
    setValue(value);
  }
}
