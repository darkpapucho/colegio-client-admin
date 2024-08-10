import { useEffect, useState } from 'react';
import { EstadoMatricula } from '../../types/enums';
import styled from 'styled-components';
import { Container } from './Container';
import CheckBox from './CheckBox';
import { theme } from '../../config/styled/styled';
import { SetURLSearchParams } from 'react-router-dom';
import useCustomEvent from '../../hooks/useCustomEvent';

const ContainerBox = styled(Container)`
  background-color: ${theme.colors.secondary[100]};
  > * {
    padding: 5px;
  }
  > :not(:last-child) {
    border-right: 1px solid black;
  }
`;

export default function EstadosMatriculaBox({ setSearchParams }: { setSearchParams: SetURLSearchParams }) {
  const [estadosMatricula, setEstadosMatricula] = useState<Set<EstadoMatricula>>(new Set(['EN PROCESO', 'DEFINITIVA']));
  useCustomEvent('customCheckbox', checkboxListener);
  //do this just once
  useEffect(() => {
    setSearchParams((prev) => {
      prev.set('estadosMatricula', [...estadosMatricula].join('-'));
      return prev;
    });
  }, []);
  return (
    <ContainerBox $direction="row" $gap="0.5rem" $border="1px solid black" $width="max-content">
      <CheckBox initialState={estadosMatricula.has('DEFINITIVA')} width="max-content" label="DEFINITIVA" name="estadoMatricula-DEFINITIVA"></CheckBox>
      <CheckBox initialState={estadosMatricula.has('EN PROCESO')} width="max-content" label="EN PROCESO" name="estadoMatricula-EN PROCESO"></CheckBox>
      <CheckBox initialState={estadosMatricula.has('TRASLADADO')} width="max-content" label="TRASLADADO" name="estadoMatricula-TRASLADADO"></CheckBox>
      <CheckBox initialState={estadosMatricula.has('RETIRADO')} width="max-content" label="RETIRADO" name="estadoMatricula-RETIRADO"></CheckBox>
    </ContainerBox>
  );
  function checkboxListener(event: CustomEvent) {
    const { name, value } = event.detail;
    const [eventName, estadoMatricula]: [string, EstadoMatricula] = name.split('-');
    if (eventName === 'estadoMatricula') {
      if (value) {
        //if true
        setEstadosMatricula((old) => old.add(estadoMatricula));
        setSearchParams((old) => {
          old.set('estadosMatricula', [...estadosMatricula].join('-'));
          return old;
        });
      } else if (!value) {
        //if value = false
        setEstadosMatricula((old) => {
          old.delete(estadoMatricula);
          return old;
        });
        setSearchParams((old) => {
          old.set('estadosMatricula', [...estadosMatricula].join('-'));
          return old;
        });
      }
    }
  }
}
