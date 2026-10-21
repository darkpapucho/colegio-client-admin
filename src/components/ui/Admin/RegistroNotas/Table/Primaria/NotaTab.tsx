import { Container } from '../../../../../shared/Container';
import { PrimariaRegistroReducer } from './registroReducerPrimaria';
import { PeriodosKey } from '../../../../../../types/documento';
import { useState } from 'react';
import { convertNumberToLetra, getColorsByNota } from './utils';
import { darkenColor } from '../../../../../../utils/tinyColor';

const NotaText = ({ $color, children }: { $color: string; children?: React.ReactNode }) => (
  <p className="w-full text-center" style={{ color: $color }}>
    {children}
  </p>
);

export default function NotaTab({
  initValue,
  dispatch,
  cursoKey,
  alumnoId,
  periodo,
  $bgColor,
}: {
  initValue: number;
  dispatch: React.Dispatch<PrimariaRegistroReducer>;
  cursoKey: string;
  alumnoId: string;
  periodo: PeriodosKey;
  $bgColor: string;
}) {
  const [value, setValue] = useState<number>(initValue);
  const { bgColor } = getColorsByNota(value);
  return (
    <Container $width="100%" $alignItems="center" $direction="row">
      <Container $width="50%" $justifyContent="center" $bgColor={$bgColor} className="border border-slate-300 border-r-0">
        <input type="number" inputMode="numeric" min={0} max={20} className="nota-input" onChange={handleChange} value={value}></input>
      </Container>
      <Container $width="50%" $justifyContent="center" $alignItems="center" $border="1px solid #cacaca" $bgColor={darkenColor($bgColor, 10)}>
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
