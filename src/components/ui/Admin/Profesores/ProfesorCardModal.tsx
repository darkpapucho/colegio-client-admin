import { Profesor } from '../../../../types/empleado';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';
import ProfesorCard from './ProfesorCard';

export default function ProfesorCardModal({ profesor, onCloseModal }: { onCloseModal: () => void; profesor: Profesor }) {
  return (
    <>
      <Modal width="86rem" title={`${profesor.apellidos}, ${profesor.nombres}`} onCloseModal={onCloseModal}>
        <ProfesorCard profesor={profesor} />
      </Modal>
      <Overlay />
    </>
  );
}
