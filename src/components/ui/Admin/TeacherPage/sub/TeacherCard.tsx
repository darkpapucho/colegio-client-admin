import { Profesor } from '../../../../../types/empleado';
import { MdEmail } from 'react-icons/md';
import { BiMobile } from 'react-icons/bi';
export default function TeacherCard({ teacher }: { teacher: Profesor }) {
  return (
    <div className="flex flex-row gap-[2rem] items-center p-[2rem] w-[100%] @[640px]:w-[60%] min-h-[140px] max-h-[200px]">
      <img
        className="w-36 h-36 aspect-auto rounded-full object-cover"
        src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"></img>
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[5px] w-full">
          <div className="flex items-center">
            <p className="text-[14px] font-semibold line-clamp-1">{teacher.nombres + ' ' + teacher.apellidos}</p>
          </div>
          <div className="flex items-center">
            <p className="text-[12px] font-light line-clamp-1">lorem ipsum lorem ipsdf plprem eanae lorem ipsum sd</p>
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <MdEmail fontSize={'16px'} />
          <p className="text-[12px] font-normal">{teacher.correo}</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <BiMobile fontSize={'16px'} />
          <p className="text-[12px] font-normal">{teacher.telefono}</p>
        </div>
      </div>
    </div>
  );
}
