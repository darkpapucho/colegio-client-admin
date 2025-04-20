import { useParams } from 'react-router-dom';
import useFetchProfesores from '../../../../hooks/useFetchProfesores';
import Loader from '../../Loader/Loader';
import TeacherCard from './sub/TeacherCard';
import TeacherStadistics from './sub/TeacherStatidistics';
import HorarioProfesor from './sub/HorarioProfesor';
import RendimientoProfesorChart from './sub/RendimientoProfesorChart';
import AnuncioProfesorCard from '../../../shared/AnuncioProfesorCard';
import { GrAnnounce } from 'react-icons/gr';

export default function TeacherPage() {
  const { teacher } = useParams();
  const { data, isLoading } = useFetchProfesores();
  if (!data) {
    return <Loader />;
  }
  const teacherData = data.find((prof) => prof._id === teacher);
  const horario = teacherData?.horario;
  const anuncios = teacherData?.anuncios;
  return (
    <>
      {isLoading && <Loader />}
      <div className="@container w-ful">
        <div className="grid grid-cols-1 @[840px]:grid-cols-3">
          <div className="@container col-span-1 @[840px]:col-span-2 flex flex-col @[600px]:flex-row h-auto p-2">
            <div className="@container flex flex-col justify-start  @[640px]:flex-row w-[100%] ">
              <TeacherCard teacher={teacherData!} />
              <TeacherStadistics profesor={teacherData!} />
            </div>
          </div>
          <div className="col-span-1 row-start-2 row-end-3 @[840px]:col-span-2 w-[100%] p-2">{horario && <HorarioProfesor horario={horario} />}</div>
          <div className="col-span-1 w-full  p-2 row-start-3 row-end-4 @[840px]:row-start-1 @[840px]:row-end-3 gap-4">
            <RendimientoProfesorChart />
            {anuncios && (
              <div className="flex w-full flex-col">
                <div className="flex items-center gap-4">
                  <GrAnnounce fontSize={'18px'} />
                  <p className="text-[18px] font-bold">Anuncios</p>
                </div>
                {anuncios.map((anuncio, ind) => (
                  <AnuncioProfesorCard key={ind} anuncio={anuncio} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
