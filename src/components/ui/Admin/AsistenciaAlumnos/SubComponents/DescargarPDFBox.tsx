import styled from 'styled-components';
import { Container } from '../../../../shared/Container';
import { theme } from '../../../../../config/styled/styled';
import { Button } from '../../../../shared/Button';
import CheckBox from '../../../../shared/CheckBox';
import { SetURLSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomEvent from '../../../../../hooks/useCustomEvent';

const ContainerBox = styled(Container)`
  background-color: ${theme.colors.secondary[200]};
  border: 1px solid black;
  padding: 0.5rem;
  gap: 1rem;
  > :first-child {
    padding: 5px;
  }
`;

export default function DescargarPDFBox({ downloadPDFHandler, setSearchParams }: { setSearchParams: SetURLSearchParams; downloadPDFHandler: () => void }) {
  const [withData, setWithData] = useState(true);
  useCustomEvent('customCheckbox', checkboxListener);
  useEffect(() => {
    setSearchParams((prev) => {
      prev.set('withData', withData ? 'true' : 'false');
      return prev;
    });
  }, []);
  return (
    <ContainerBox $direction="row" $bgColor={theme.colors.secondary[200]} $width="max-content">
      <Container $bgColor={theme.colors.secondary[100]}>
        <CheckBox name="withData" label="CON DATOS" initialState={withData} width="auto"></CheckBox>
      </Container>
      <Button $primary onClick={downloadPDFHandler} $width="14rem" $center $height="30px">
        DESCARGAR PDF
      </Button>
    </ContainerBox>
  );
  function checkboxListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'withData') {
      setWithData(value);
      setSearchParams((prev) => {
        prev.set('withData', value ? 'true' : 'false');
        return prev;
      });
    }
  }
}
