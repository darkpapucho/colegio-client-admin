import { AMatriculado } from './alumno';

export type DeudaStatus = 'pendiente' | 'pagado';
export type ItemDeuda = {
  descripcion: string;
  precio_unitario: number;
  cantidad: number;
  abonado: number;
  lastUpdateDate: string;
  fecha: string;
};
export type OtrasDeudas = {
  alumno: AMatriculado;
  deuda: {
    deudaTotal: number;
    abonado: number;
    status: DeudaStatus;
    lastUpdateDate?: string;
    fechaPagoTotal?: string;
    reciboId?: string;
    items: ItemDeuda[];
  };
};
