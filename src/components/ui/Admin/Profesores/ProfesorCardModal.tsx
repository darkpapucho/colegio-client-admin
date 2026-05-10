import { Profesor } from '../../../../types/empleado';
import Modal from '../../../shared/Modal';
import ProfesorCard from '../../../shared/Profesor/ProfesorCard';

export default function ProfesorCardModal({ profesor, onCloseModal }: { onCloseModal: () => void; profesor: Profesor }) {
  return (
    <Modal width="54rem" title={`${profesor.apellidos}, ${profesor.nombres}`} onCloseModal={onCloseModal}>
      <ProfesorCard profesor={profesor} />
    </Modal>
  );
}
