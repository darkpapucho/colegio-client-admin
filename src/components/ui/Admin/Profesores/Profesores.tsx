import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import SimpleLayout from '../../../shared/SimpleLayout';
import { Nivel, Year } from '../../../../types/enums';
import { useState } from 'react';
import { useImmerReducer } from 'use-immer';
import ProfesorReducer, { ProfesorReducerAction } from '../../../shared/Profesor/ProfesorReducer';
import { Profesor } from '../../../../types/empleado';
import ProfesorCardModal from './ProfesorCardModal';
import ProfesoresTable from './ProfesoresTable';
import Loader from '../../Loader/Loader';
import { ProfesoresContext, initialState } from '../../../shared/Profesor/ProfesorContext';
import useFetchProfesores from '../../../../hooks/useFetchProfesores';

export default function Profesores() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año) as Year;
  const { data, isLoading } = useFetchProfesores();
  // const [profesores, dispatchProfesores] = useImmerReducer(ProfesoresReducer,[] as Profesor[]);
  const [selectedProfesor, dispatch] = useImmerReducer<{ profesor: Profesor }, ProfesorReducerAction>(ProfesorReducer, { profesor: initialState });
  const [showModal, setShowModal] = useState(false);

  return (
    <SimpleLayout title={`Profesores ${nivel} - ${año}`}>
      {isLoading && <Loader />}
      <ProfesoresContext.Provider value={{ dispatch, setShowModal, isLoading }}>
        {showModal && <ProfesorCardModal profesor={selectedProfesor.profesor} onCloseModal={closeModal} />}
        {data && data.length > 0 && <ProfesoresTable data={data} />}
      </ProfesoresContext.Provider>
    </SimpleLayout>
  );

  function closeModal() {
    setShowModal(false);
  }
}
