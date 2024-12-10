import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { AMatriculado } from '../../../../types/alumno';
import { Seccion } from '../../../../types/enums';
import { Button } from '../../../shared/Button';
import Select from '../../../shared/Select';
import Table from '../../Table/Table';
import { Fragment } from 'react';
import { Icon } from '../../../shared/Icon';
import { generateSecciones } from './utils';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { ErrorMessage } from '../../../shared/ErrorMessage';

export default function RatificacionTable({
  alumnos,
  selectedAlumnos,
  setSelectedAlumnos,
}: {
  selectedAlumnos: AMatriculado[];
  setSelectedAlumnos: React.Dispatch<React.SetStateAction<AMatriculado[]>>;
  alumnos: AMatriculado[] | undefined;
}) {
  useCustomEvent('customSelect', changeSeccionListener);
  if (!alumnos) return null;
  return (
    <Table gridTemplateColumns="35rem 8rem 10rem 12rem 5rem" width="fit-content">
      <Table.Header>
        <Table.Header.Item $padding="6px 3px">ALUMNO</Table.Header.Item>
        <Table.Header.Item $padding="6px 3px">DNI</Table.Header.Item>
        <Table.Header.Item $padding="6px 3px">GRADO</Table.Header.Item>
        <Table.Header.Item $padding="6px 3px">SECCIÓN</Table.Header.Item>
        <Table.Header.Item $padding="6px 3px">RAT.</Table.Header.Item>
      </Table.Header>
      {alumnos.length > 0 ? (
        <Table.Body>
          {alumnos.map((aMatriculado, index) => {
            const isSelectedAlready = selectedAlumnos.some((sAlumno) => sAlumno._id === aMatriculado._id);
            let seccionDefaultValue: Seccion | '' = '';
            let sAlumnoId: string = '';
            if (isSelectedAlready) {
              seccionDefaultValue = selectedAlumnos.find((sAlumno) => sAlumno._id === aMatriculado._id)!.seccion;
              sAlumnoId = selectedAlumnos.find((sAlumno) => sAlumno._id === aMatriculado._id)!._id!;
            }

            return (
              <Fragment key={index}>
                <Table.Body.Item $key={index} $padding="4px">
                  {aMatriculado.nombreCompleto}
                </Table.Body.Item>
                <Table.Body.Item $key={index} $padding="4px">
                  {aMatriculado.dni == '' ? aMatriculado.codigoEstudiante : aMatriculado.dni}
                </Table.Body.Item>
                <Table.Body.Item $key={index} $padding="4px">
                  {aMatriculado.grado}
                </Table.Body.Item>
                <Table.Body.Item $key={index} $padding="4px">
                  {isSelectedAlready ? (
                    <Select
                      tiny
                      width="4rem"
                      options={generateSecciones(aMatriculado._id)}
                      name="nuevaSeccion"
                      label="seccion"
                      defaultValue={{ label: seccionDefaultValue, value: { seccion: seccionDefaultValue, _id: sAlumnoId } }}></Select>
                  ) : (
                    aMatriculado.seccion
                  )}
                </Table.Body.Item>
                <Table.Body.Item $key={index} $padding="4px">
                  {isSelectedAlready ? (
                    <Button $danger $small onClick={() => removeAlumno(sAlumnoId)}>
                      <Icon>
                        <IoMdRemove />
                      </Icon>
                    </Button>
                  ) : (
                    <Button $primary $small onClick={() => addAlumno(aMatriculado)}>
                      <Icon>
                        <IoMdAdd />
                      </Icon>
                    </Button>
                  )}
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      ) : (
        <ErrorMessage align="center" message={'Sin resultados'} />
      )}
    </Table>
  );

  function removeAlumno(_id: string) {
    setSelectedAlumnos((old) => old.filter((sAlumno) => sAlumno._id !== _id));
  }
  function addAlumno(aMatriculado: AMatriculado) {
    setSelectedAlumnos((old) => [...old, { ...aMatriculado }]);
  }
  function changeSeccion({ _id, nuevaSeccion }: { _id: string; nuevaSeccion: Seccion }) {
    setSelectedAlumnos((old) =>
      old.map((sAlumno) => {
        if (sAlumno._id === _id) {
          sAlumno.seccion = nuevaSeccion;
        }
        return sAlumno;
      }),
    );
  }
  function changeSeccionListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'nuevaSeccion') {
      changeSeccion({ _id: value._id, nuevaSeccion: value.seccion });
    }
  }
}
