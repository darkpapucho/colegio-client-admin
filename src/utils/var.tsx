import { MenuItem } from '../types/globals';
import { HiAcademicCap } from 'react-icons/hi';
import { FiUserPlus, FiUsers } from 'react-icons/fi';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { CgUserList } from 'react-icons/cg';
import { RxCalendar } from 'react-icons/rx';
import { RiFileList3Line, RiExchangeBoxLine } from 'react-icons/ri';
// import { FaRegFilePdf } from 'react-icons/fa';
import { API_BASE_URL } from '../var/globals';
import { CursoMap } from '../types/documento';
import { PiListChecksBold } from 'react-icons/pi';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GrAnnounce } from 'react-icons/gr';

export const baseUrl = API_BASE_URL;

export const SECCIONES_SELECT_OPTIONS = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
];

export const NIVELES_SELECT_OPTIONS = [
  { label: 'inicial', value: 'inicial' },
  { label: 'primaria', value: 'primaria' },
  { label: 'secundaria', value: 'secundaria' },
];
export const AÑOS_SELECT_OPTIONS = [
  { label: '2025', value: '2025' },
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
  secundaria: [
    { label: 'Primero', value: 'PRIMERO' },
    { label: 'Segundo', value: 'SEGUNDO' },
    { label: 'Tercero', value: 'TERCERO' },
    { label: 'Cuarto', value: 'CUARTO' },
    { label: 'Quinto', value: 'QUINTO' },
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
  secundaria: [
    { label: 'Sexto Primaria', value: 'SEXTO' },
    { label: 'Primero', value: 'PRIMERO' },
    { label: 'Segundo', value: 'SEGUNDO' },
    { label: 'Tercero', value: 'TERCERO' },
    { label: 'Cuarto', value: 'CUARTO' },
    { label: 'Quinto', value: 'QUINTO' },
  ],
};
export const SEXOS_SELECT_OPTION = [
  { label: 'Hombre', value: 'Hombre' },
  { label: 'Mujer', value: 'Mujer' },
];

export const menuItems: { admin: MenuItem[]; promotor: MenuItem[]; profesor: MenuItem[] } = {
  admin: [
    {
      icon: <PiListChecksBold />,
      label: 'Asistencia Alumnos',
      url: '/menu/admin/asistencia-alumnos',
    },
    { icon: <CgUserList />, label: 'Matrícula Alumnos', url: '/menu/admin/matricula-alumnos' },

    {
      icon: <PiBookOpenTextLight />,
      label: 'Notas Alumnos',
      url: '/menu/admin/notas-alumnos',
    },
    {
      icon: <RiFileList3Line />,
      label: 'emitir documentos',
      url: '/menu/admin/emitirdocumentos',
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
      icon: <RxCalendar />,
      label: 'Calendario Escolar',
      url: '/menu/admin/calendario',
    },

    {
      icon: <RiExchangeBoxLine />,
      label: 'Cambiar Periodo',
      url: '/menu/admin/cambiar-periodo',
    },
    {
      icon: <BiMoneyWithdraw />,
      label: 'Pensiones',
      url: '/menu/admin/pensiones',
    },
    {
      icon: <GrAnnounce />,
      label: 'Anuncios',
      url: '/menu/admin/anuncios',
    },
    {
      icon: <BiMoneyWithdraw />,
      label: 'Pagos Yape',
      url: '/menu/admin/pagos',
    },
    {
      icon: <BiMoneyWithdraw />,
      label: 'TEST NOTAS',
      url: '/menu/admin/test-notas',
    },
    {
      icon: <BiMoneyWithdraw />,
      label: 'CURSOS',
      url: '/menu/admin/cursos',
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
//mapa de los cursos de ambos niveles para los registros de notas
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
  { key: 'computacion', label: 'Computación', code: 'CP' },
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
  computacion: 'CP',
};
export const NOTAS_OPTIONS = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'AD', value: 'AD' },
];
