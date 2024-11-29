import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import { Button } from '../../../../shared/Button';
import { useState } from 'react';
// import { validateDay } from '../../../Calendario/EnableDays/utils';
import { Pensiones } from '../../../../../models/Pensiones';
import { updateToken } from '../../../../../utils/utils';
import { errorHandler } from '../../../../../utils/errorHandler';
import Loader from '../../../Loader/Loader';
import { Grado, Salon, Seccion } from '../../../../../types/enums';
import RecordPensionesPagadasTable from './RecordPensionesPagadasTable';
import { convertSalonToIndex } from '../../../../../utils/convertGradoToIndex';

type ValuePiece = Date | null;
type DateRangeValue = ValuePiece | [ValuePiece, ValuePiece];
export default function RecordPensionesByDateRange() {
  const currentYear = new Date().getFullYear(); // YYYY
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear}-12-31`;
  const [dateRange, setDateRange] = useState<DateRangeValue>([new Date(), new Date()]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ alumno: { nombreCompleto: string; grado: Grado; seccion: Seccion }; pensiones: Pension[] }[]>([]);
  return (
    <Container $width="100%" $direction="column" $gap="2rem">
      {isLoading && <Loader />}
      <Container $direction="column" $width="60%" $gap="1rem" $height="max-content" $padding="1rem">
        <Text $width="100%" $textAlign="center" $bold $fontSize="medium">
          CONSULTAR ÚLTIMAS PENSIONES PAGADAS
        </Text>
        <Container $direction="row" $width="60rem" $gap="1rem" $height="max-content" $padding="1rem">
          <Container $width="25rem" $height="max-content" $direction="row" $border="1px solid black">
            <DateTimeRangePicker
              // onClickDay={(value) => validateDay(value)}
              value={dateRange}
              onChange={setDateRange}
              disabled={isLoading}
              disableClock={true}
              format="dd-MM-yyyy"
              minDate={new Date(minDate)}
              maxDate={new Date(maxDate)}
            />
          </Container>
          <Container $direction="column" $width="35rem">
            {dateRange && (
              <Container $direction="row" $gap="1rem" $width="100%" $height="max-content">
                <Text $fontSize="small" $bold $width="15%" $textAlign="right">
                  DEL:{' '}
                </Text>

                <Text $fontSize="small" $bold $width="85%" $textAlign="left" $color="hotpink">
                  {new Date(dateRange[0]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })}
                </Text>
              </Container>
            )}
            {dateRange && (
              <Container $direction="row" $gap="1rem" $width="100%">
                <Text $fontSize="small" $bold $width="15%" $textAlign="right">
                  AL:
                </Text>

                <Text $fontSize="small" $bold $width="85%" $textAlign="left" $color="#0A5EB0">
                  {new Date(dateRange[1]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })}
                </Text>
              </Container>
            )}
          </Container>
        </Container>
        <Container $width="100%" $justifyContent="center">
          <Button $primary onClick={() => handleSubmit(dateRange as [Date, Date])} disabled={isLoading}>
            <Text $width="15rem" $textAlign="center" $bold>
              Consultar
            </Text>
          </Button>
        </Container>
      </Container>
      {data && <RecordPensionesPagadasTable data={data} />}
    </Container>
  );
  async function handleSubmit(dateRange: [Date, Date]) {
    try {
      if (!dateRange) throw new Error('Debes seleccionar un rango de fechas');
      setIsLoading(true);
      const initDateRaw = new Date(dateRange[0]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).split('/');
      const initDate = Array.from(initDateRaw, (_, index) => initDateRaw[initDateRaw.length - 1 - index]).join('-');
      const endDateRaw = new Date(dateRange[1]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).split('/');
      const endDate = Array.from(endDateRaw, (_, index) => endDateRaw[endDateRaw.length - 1 - index]).join('-');
      const response = await Pensiones.getRecordPensionesPagadasByDateRange({ initDate, endDate });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      setData(
        response.data.payload.sort((prev, curr) => {
          return convertSalonToIndex((prev.alumno.grado + ' ' + prev.alumno.seccion) as Salon) > convertSalonToIndex((curr.alumno.grado + ' ' + curr.alumno.seccion) as Salon)
            ? 1
            : 0;
        }),
      );
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
}
