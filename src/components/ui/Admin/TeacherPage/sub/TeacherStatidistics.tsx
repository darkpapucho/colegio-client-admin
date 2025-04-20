import calendarIcon from '/icons/singleAttendance.png';
import singleClass from '/icons/singleClass.png';
import singleLesson from '/icons/singleLesson.png';
import singleBranch from '/icons/singleBranch.png';
import { Profesor } from '../../../../../types/empleado';
export default function TeacherStadistics({ profesor }: { profesor: Profesor }) {
  const salones = profesor.salones.length;
  const cursos = profesor.salones.reduce((acc, curr) => {
    return (acc += curr.cursos.length);
  }, 0);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] w-[100%] @[640px]:w-[40%] max-h-[200px]">
      <div className=" flex gap-[12px] p-2 items-center pl-[3rem]">
        <img src={calendarIcon} className="w-10 h-10 "></img>
        <div>
          <p className="text-[14px] font-semibold">90% </p>
          <span className="text-[14px] font-light">Attendance</span>
        </div>
      </div>
      <div className=" flex gap-[12px] p-2 items-center pl-[3rem]">
        <img src={singleClass} className="w-10 h-10 "></img>
        <div>
          <p className="text-[14px] font-semibold">{salones} </p>
          <span className="text-[14px] font-light">{salones == 1 ? 'Salón' : 'Salones'}</span>
        </div>
      </div>
      <div className=" flex gap-[12px] p-2 items-center pl-[3rem]">
        <img src={singleLesson} className="w-10 h-10 "></img>
        <div>
          <p className="text-[14px] font-semibold">{cursos} </p>
          <span className="text-[14px] font-light">{cursos == 1 ? 'Curso' : 'Cursos'}</span>
        </div>
      </div>
      <div className=" flex gap-[12px] p-2 items-center pl-[3rem]">
        <img src={singleBranch} className="w-10 h-10 "></img>
        <div>
          <p className="text-[14px] font-semibold">92% </p>
          <span className="text-[14px] font-light">Rendimiento</span>
        </div>
      </div>
    </div>
  );
}
