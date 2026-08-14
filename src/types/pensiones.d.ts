import { Apoderado } from './alumno';

export type PensionNoPagada = {
  mes: number;
  pagado: false;
  monto_pagar: number;
  monto_pagado: number;
  fecha: '';
};

export type PensionPagada = {
  mes: number;
  pagado: true;
  monto_pagar: number;
  monto_pagado: number;
  fecha: string;
  reciboId: string;
};

export type Pension = PensionPagada | PensionNoPagada;

export type PensionTable = {
  alumnoId: ObjectId;
  pensiones: PensionRecord[];
  estudiante: AMatriculado;
  numPensionesPagadas: number;
  montoMatricula?: number;
  reciboMatricula?: string;
};

export type ComentarioPension = {
  fecha: string;
  detalle: string;
};

export type PensionesAtrasadasListDetail = {
  _id: string;
  nombreCompleto: string;
  grado: string;
  seccion: string;
  dni: string;
  apoderados: Apoderado[];
  codigoEstudiante: string;
  mesesAtrasoDetalle: PensionNoPagada[];
  totalMesesAtraso: number;
  pensionesPagadas: number;
  ultimoCobro?: {
    detalle: string;
    fecha: string;
  };
};
export type AtrasoPensionDetailModal = {
  nombreCompleto: string;
  mesesAtrasoDetalle: PensionNoPagada[];
  totalMesesAtraso: number;
  apoderados: Apoderado[];
  _id: string;
  ultimoCobro?: {
    detalle: string;
    fecha: string;
  };
};
