import {
  CursosLabelInicial,
  CursosLabelPrimaria,
  CursosKeyInicial,
  CursosKeyPrimaria,
  GradosInicial,
  GradosPrimaria,
  SalonesInicial,
  SalonesPrimaria,
  Secciones,
  SalonesSecundaria,
  GradosSecundaria,
  CursosLabelSecundaria,
  CursosKeySecundaria,
} from './enums';

export interface SalonInicial {
  label: SalonesInicial;
  grado: GradosInicial;
  seccion: Secciones;
  order: number;
  cursos: {
    label: CursosLabelInicial;
    key: CursosKeyInicial;
  };
}
export interface SalonPrimaria {
  label: SalonesPrimaria;
  grado: GradosPrimaria;
  seccion: Secciones;
  order: number;
  cursos: {
    label: CursosLabelPrimaria;
    key: CursosKeyPrimaria;
  };
}

export interface SalonSecundaria {
  label: SalonesSecundaria;
  grado: GradosSecundaria;
  seccion: Secciones;
  order: number;
  cursos: {
    label: CursosLabelSecundaria;
    key: CursosKeySecundaria;
  };
}

export interface Curso {
  label: CursosLabelInicial | CursosLabelPrimaria | CursosLabelSecundaria;
  value: CursosValueInicial | CursosValuePrimaria | CursosValueSecundaria;
}
