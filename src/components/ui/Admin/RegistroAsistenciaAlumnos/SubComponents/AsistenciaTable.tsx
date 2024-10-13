import Table from '../../../Table/Table';
import { AsistenciasList } from '../types';
import { getMonthsFromAsistenciaRecord } from '../utils';
import MonthBody from './MonthBody';
import MonthHeader from './MonthHeader';
import { Container } from '../../../../shared/Container';
import { Fragment, useState } from 'react';
import { MONTH_NAME } from '../../../../../types/enums';

export default function AsistenciaTable({ asistencias, availableDays }: { asistencias: AsistenciasList; availableDays: { month: MONTH_NAME; day: number }[] }) {
  const { monthNames, daysByMonth, gridTemplateCols } = getMonthsFromAsistenciaRecord(availableDays);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  console.log({ selectedRow });
  return (
    <Table gridTemplateColumns={gridTemplateCols} width="max-content">
      <Table.Header>
        <Table.Header.Item>
          <Container $border="1px solid black" $width="100%" $height="100%" $justifyContent="center" $alignItems="center">
            Alumno
          </Container>
        </Table.Header.Item>
        {monthNames.map((month) => {
          return (
            <Table.Header.Item key={month}>
              <MonthHeader monthName={month} days={daysByMonth[month]}></MonthHeader>
            </Table.Header.Item>
          );
        })}
      </Table.Header>
      <Table.Body>
        {asistencias.map((element, index) => {
          return (
            <Fragment key={index}>
              <Table.Body.Item>
                <Container
                  $bgColor={index === selectedRow ? 'yellow' : 'white'}
                  $direction="row"
                  $width="100%"
                  $border="1px solid black"
                  onClick={() => handleTableClick({ index, currentSelectedRow: selectedRow })}>
                  <Container $width="2.5rem">{`[${index + 1}]`}</Container>
                  <Container>{element.nombreCompleto}</Container>
                </Container>
              </Table.Body.Item>
              {monthNames.map((monthName) => {
                return (
                  <Table.Body.Item key={monthName}>
                    <MonthBody
                      isSelected={selectedRow === index}
                      onClick={() => handleTableClick({ index, currentSelectedRow: selectedRow })}
                      alumnoId={element.alumnoId}
                      monthName={monthName}
                      records={element.records}
                      days={daysByMonth[monthName]}
                    />
                  </Table.Body.Item>
                );
              })}
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );

  function handleTableClick({ index, currentSelectedRow }: { index: number; currentSelectedRow: null | number }) {
    if (currentSelectedRow == index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  }
}
