import { MenuItem } from '../types/globals';
import { HiAcademicCap } from 'react-icons/hi';
import { FiUserPlus, FiUsers, FiUserCheck } from 'react-icons/fi';
import { TbDeviceTabletDown, TbDeviceTabletUp } from 'react-icons/tb';
import { PiUsersFourBold, PiBookOpenTextLight } from 'react-icons/pi';
import { CgUserAdd, CgUserList, CgUserRemove } from 'react-icons/cg';
import { RxCalendar } from 'react-icons/rx';
import { RiUserFollowLine, RiFileList3Line } from 'react-icons/ri';
import { FaRegFilePdf } from 'react-icons/fa';
import { API_BASE_URL } from '../var/globals';
import { CursoMap } from '../types/documento';

export const baseUrl = API_BASE_URL;

export const sections = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
];

export const nivels = [
  { label: 'inicial', value: 'inicial' },
  { label: 'primaria', value: 'primaria' },
];
export const años = [
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' },
];

export const grados = {
  primaria: [
    { label: 'Primero', value: 'PRIMERO' },
    { label: 'Segundo', value: 'SEGUNDO' },
    { label: 'Tercero', value: 'TERCERO' },
    { label: 'Cuarto', value: 'CUARTO' },
    { label: 'Quinto', value: 'QUINTO' },
    { label: 'Sexto', value: 'SEXTO' },
  ],
  inicial: [
    { label: 'Grupo 3 años', value: 'Grupo 3 años' },
    { label: 'Grupo 4 años', value: 'Grupo 4 años' },
    { label: 'Grupo 5 años', value: 'Grupo 5 años' },
  ],
};
export const gradosRatificar = {
  inicial: [
    { label: 'Grupo 3 años', value: 'Grupo 3 años' },
    { label: 'Grupo 4 años', value: 'Grupo 4 años' },
  ],
  primaria: [
    { label: 'Grupo 5 años', value: 'Grupo 5 años' },
    { label: 'Primero', value: 'PRIMERO' },
    { label: 'Segundo', value: 'SEGUNDO' },
    { label: 'Tercero', value: 'TERCERO' },
    { label: 'Cuarto', value: 'CUARTO' },
    { label: 'Quinto', value: 'QUINTO' },
  ],
};
export const sexos = [
  { label: 'Hombre', value: 'Hombre' },
  { label: 'Mujer', value: 'Mujer' },
];

export const menuItems: { admin: MenuItem[]; promotor: MenuItem[]; profesor: MenuItem[] } = {
  admin: [
    {
      icon: <CgUserAdd />,
      label: 'Nueva Matrícula',
      url: '/menu/admin/matriculadirecta',
    },
    {
      icon: <CgUserRemove />,
      label: 'Retirar Alumno',
      url: '/menu/admin/retiraralumno',
    },
    {
      icon: <RiUserFollowLine />,
      label: 'ratificar matricula',
      url: '/menu/admin/ratificarmatricula',
    },
    {
      icon: <CgUserList />,
      label: 'Matriculados',
      url: '/menu/admin/matriculados',
    },
    {
      icon: <RiFileList3Line />,
      label: 'emitir documentos',
      url: '/menu/admin/emitirdocumentos',
    },
    {
      icon: <FaRegFilePdf />,
      label: 'Emitir boleta de notas',
      url: '/menu/admin/boletadenotas',
    },

    {
      icon: <PiBookOpenTextLight />,
      label: 'Registro Notas',
      url: '/menu/admin/registronotas',
    },
    {
      icon: <FiUserPlus />,
      label: 'Agregar Profesor',
      url: '/menu/admin/agregarprofesor',
    },
    {
      icon: <FiUsers />,
      label: 'Profesores',
      url: '/menu/admin/gestionarprofesores',
    },
    {
      icon: <TbDeviceTabletUp />,
      label: 'Subir Files-notas',
      url: '/menu/admin/subirnotasexcelfiles',
    },
    {
      icon: <TbDeviceTabletDown />,
      label: 'Descargar Files-Notas',
      url: '/menu/admin/manejarnotasprofesores',
    },
    {
      icon: <FiUserCheck />,
      label: 'Gestionar asistencia',
      url: '/menu/admin/verasistenciaprofesores',
    },
    {
      icon: <PiUsersFourBold />,
      label: 'Gestionar Empleados',
      url: '/menu/admin/vertodosempleados',
    },
    {
      icon: <RxCalendar />,
      label: 'gestionar pensiones',
      url: '/menu/admin/gestionarpensiones',
    },
  ],
  promotor: [
    { label: 'promotor1', url: 'admin', icon: <HiAcademicCap /> },
    { label: 'promotor2', url: 'admin', icon: <HiAcademicCap /> },
    { label: 'promotor3', url: 'admin', icon: <HiAcademicCap /> },
  ],
  profesor: [
    { label: 'profesor1', url: 'admin', icon: <HiAcademicCap /> },
    { label: 'profesor2', url: 'admin', icon: <HiAcademicCap /> },
    { label: 'profesor3', url: 'admin', icon: <HiAcademicCap /> },
  ],
};

export const CURSOS_MAP: CursoMap[] = [
  { key: 'matematica', label: 'Matemática', code: 'MA' },
  { key: 'cienciaTecnologia', label: 'Ciencia y Tecnología', code: 'CT' },
  { key: 'personalSocial', label: 'Personal Social', code: 'PS' },
  { key: 'educacionFisica', label: 'Educación Física', code: 'EF' },
  { key: 'comunicacion', label: 'Comunicación', code: 'CO' },
  { key: 'arteCultura', label: 'Arte y Cultura', code: 'AC' },
  { key: 'ingles', label: 'Inglés', code: 'IN' },
  { key: 'religion', label: 'Religión', code: 'RE' },
  { key: 'psicomotriz', label: 'Psicomotriz', code: 'PZ' },
  { key: 'competenciasTransversales', label: 'Competencias Transversales', code: 'CX' },
];
export const CURSOS_CODES_MAP = {
  matematica: 'MA',
  cienciaTecnologia: 'CT',
  personalSocial: 'PS',
  educacionFisica: 'EF',
  comunicacion: 'CO',
  arteCultura: 'AC',
  ingles: 'IN',
  religion: 'RE',
  psicomotriz: 'PZ',
  competenciasTransversales: 'CX',
};
export const NOTAS_OPTIONS = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'AD', value: 'AD' },
];
