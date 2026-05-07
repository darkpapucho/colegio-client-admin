import { AMatriculado } from '../../../../../../types/alumno';
import { Pension, PensionNoPagada, PensionPagada } from '../../../../../../types/pensiones';
import EditarPensionPagadaCard from './EditarPensionPagadaCard';
import PagarPensionCard from './PagarPensionCard';

export default function DisplayPensionData({
  selectedData,
  onCloseModal,
}: {
  onCloseModal: () => void;
  selectedData: { estudiante: AMatriculado; pension: Pension };
}) {
  //

  if (!selectedData.pension.pagado) {
    return (
      <PagarPensionCard onCloseModal={onCloseModal} selectedData={{ estudiante: selectedData.estudiante, pension: selectedData.pension as PensionNoPagada }} />
    );
  }
  //display informacion
  return (
    <EditarPensionPagadaCard
      onCloseModal={onCloseModal}
      selectedData={{ estudiante: selectedData.estudiante, pension: selectedData.pension as PensionPagada }}
    />
  );

  // function convertIndexToMonth(index: number) {
  //   return MONTHS[index];
  // }
}
