import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import SimpleLayout from '../../../shared/SimpleLayout';
import { Nivel, Year } from '../../../../types/enums';
import { useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import ProfesorReducer, { ProfesorReducerAction } from '../../../shared/Profesor/ProfesorReducer';
import { Profesor } from '../../../../types/empleado';
import ProfesorCardModal from './ProfesorCardModal';
import ProfesoresTable from './ProfesoresTable';
import Loader from '../../Loader/Loader';
import { errorHandler } from '../../../../utils/errorHandler';
import { fetchProfesores } from './utils';
import { ProfesoresContext, initialState } from '../../../shared/Profesor/ProfesorContext';

export default function Profesores() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año) as Year;
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ['profesores', nivel, año],
    queryFn: fetchProfesores,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 20,
  });
  // const [profesores, dispatchProfesores] = useImmerReducer(ProfesoresReducer,[] as Profesor[]);
  const [selectedProfesor, dispatch] = useImmerReducer<{ profesor: Profesor }, ProfesorReducerAction>(ProfesorReducer, { profesor: initialState });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [isError]);

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
