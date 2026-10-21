import { WidthCss } from '../../../types/globals';
import { useEffect } from 'react';
import { publishEvent } from '../../../utils/customEvent';
import { RiAddBoxFill } from 'react-icons/ri';
import { useImmerReducer } from 'use-immer';
import MultiSelectReducer from './reducer';
import { Container } from '../Container';
import { Button } from '../Button';
import { AiFillCloseSquare } from 'react-icons/ai';
import { Text } from '../Text';
import { SalonProfesor } from '../Profesor/types';

export const OptionsContainer = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`absolute left-0 top-0 flex w-1/2 flex-col gap-0.5 ${className}`}>{children}</div>
);
export const SelectedOptionsContainer = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`absolute left-1/2 top-0 flex w-1/2 flex-col gap-0.5 ${className}`}>{children}</div>
);

export default function MultiSelect({ items, width, name }: { items: SalonProfesor[]; width: WidthCss; name: string }) {
  const [state, dispatch] = useImmerReducer(MultiSelectReducer, { options: items, selectedOptions: [] as SalonProfesor[] });
  useEffect(() => {
    publishEvent('multiSelect', { name, value: state.selectedOptions });
  }, [state.selectedOptions.length]);

  return (
    <Container $direction="row" $width={width} $position="relative" $bgColor="white" className="rounded-lg border border-slate-300 shadow-card">
      <OptionsContainer>
        <Text $bold $fontSize="medium" $textAlign="center">
          Salones
        </Text>
        {state.options.map((option) => {
          return (
            <Button $secondary $small onClick={() => addOption(option)} key={option.label} $padding="4px 2rem">
              {option.label}
              <RiAddBoxFill></RiAddBoxFill>
            </Button>
          );
        })}
      </OptionsContainer>
      <SelectedOptionsContainer>
        <Text $bold $fontSize="medium" $textAlign="center">
          Seleccionados
        </Text>
        {state.selectedOptions.map((option) => {
          return (
            <Button $green $small onClick={() => removeOption(option)} key={option.label} $padding="4px 2rem">
              {option.label}
              <AiFillCloseSquare></AiFillCloseSquare>
            </Button>
          );
        })}
      </SelectedOptionsContainer>
    </Container>
  );

  //clicking an option will remove it from the selected options
  function addOption(option: SalonProfesor) {
    dispatch({ type: 'selectOneOption', payload: option });
  }

  function removeOption(option: SalonProfesor) {
    dispatch({ type: 'removeOneOption', payload: option });
  }
}
