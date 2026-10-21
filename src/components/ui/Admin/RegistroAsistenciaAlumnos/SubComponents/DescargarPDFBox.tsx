import { Container } from '../../../../shared/Container';
import { theme } from '../../../../../config/styled/styled';
import { Button } from '../../../../shared/Button';
import CheckBox from '../../../../shared/CheckBox';
import { SetURLSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomEvent from '../../../../../hooks/useCustomEvent';

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
    <Container $direction="row" $bgColor={theme.colors.secondary[200]} $width="max-content" $border="1px solid #CBD5E1" $gap="1rem" className="p-2">
      <Container $bgColor={theme.colors.secondary[100]} className="p-[5px]">
        <CheckBox name="withData" label="CON DATOS" initialState={withData} width="auto"></CheckBox>
      </Container>
      <Button $primary onClick={downloadPDFHandler} $width="14rem" $center $height="30px">
        DESCARGAR PDF
      </Button>
    </Container>
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
