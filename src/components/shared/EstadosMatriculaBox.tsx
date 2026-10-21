import { useEffect, useState } from 'react';
import { EstadoMatricula } from '../../types/enums';
import { Container } from './Container';
import CheckBox from './CheckBox';
import { SetURLSearchParams } from 'react-router-dom';
import useCustomEvent from '../../hooks/useCustomEvent';

export default function EstadosMatriculaBox({ setSearchParams }: { setSearchParams: SetURLSearchParams }) {
  const [estadosMatricula, setEstadosMatricula] = useState<Set<EstadoMatricula>>(new Set(['DEFINITIVA']));
  useCustomEvent('customCheckbox', checkboxListener);
  //do this just once
  useEffect(() => {
    setSearchParams((prev) => {
      prev.set('estadosMatricula', [...estadosMatricula].join('-'));
      return prev;
    });
  }, []);
  return (
    <Container $direction="row" $gap="0.5rem" $border="1px solid #CBD5E1" $width="max-content" className="rounded-lg bg-brand-100 divide-x divide-slate-300 [&>*]:p-[5px]">
      <CheckBox initialState={estadosMatricula.has('DEFINITIVA')} width="max-content" label="DEFINITIVA" name="estadoMatricula-DEFINITIVA"></CheckBox>
      <CheckBox initialState={estadosMatricula.has('SUSPENDIDO')} width="max-content" label="SUSPENDIDO" name="estadoMatricula-SUSPENDIDO"></CheckBox>
      <CheckBox initialState={estadosMatricula.has('TRASLADADO')} width="max-content" label="TRASLADADO" name="estadoMatricula-TRASLADADO"></CheckBox>
      <CheckBox initialState={estadosMatricula.has('RETIRADO')} width="max-content" label="RETIRADO" name="estadoMatricula-RETIRADO"></CheckBox>
    </Container>
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
