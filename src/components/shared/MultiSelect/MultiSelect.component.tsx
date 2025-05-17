import styled from 'styled-components';
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

export const OptionsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  inset-inline: 0 50%;
  inset-block: 0 100%;
  width: 50%;
  height: max-content;
`;
export const SelectedOptionsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;

  inset-inline: 50% 100%;
  inset-block: 0% 100%;
  width: 50%;
  height: max-content;
`;

export default function MultiSelect({ items, width, name }: { items: SalonProfesor[]; width: WidthCss; name: string }) {
  const [state, dispatch] = useImmerReducer(MultiSelectReducer, { options: items, selectedOptions: [] as SalonProfesor[] });
  useEffect(() => {
    publishEvent('multiSelect', { name, value: state.selectedOptions });
  }, [state.selectedOptions.length]);

  return (
    <Container $direction="row" $width={width} $position="relative" $bgColor="red">
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
