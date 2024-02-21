export const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:4000' : import.meta.env.VITE_API_BASE_URL;
//import.meta.env.DEV ? 'http://localhost:4000' :
export const GradosDestino = {
  inicial: [
    { label: 'Grupo 3 años', value: 'Grupo 3 años' },
    { label: 'Grupo 4 años', value: 'Grupo 4 años' },
    { label: 'Grupo 5 años', value: 'Grupo 5 años' },
    { label: 'Primero Primaria', value: 'PRIMERO PRIMARIA' },
  ],
  primaria: [
    { label: 'Primero', value: 'PRIMERO' },
    { label: 'Segundo', value: 'SEGUNDO' },
    { label: 'Tercero', value: 'TERCERO' },
    { label: 'Cuarto', value: 'CUARTO' },
    { label: 'Quinto', value: 'QUINTO' },
    { label: 'Sexto', value: 'SEXTO' },
    { label: 'Primero Secundaria', value: 'PRIMERO SECUNDARIA' },
  ],
};

export const ESTADOS_MATRICULA_SELECT_OPTIONS = [
  { label: 'Pendiente', value: 'PENDIENTE' },
  { label: 'Definitiva', value: 'DEFINITIVA' },
  { label: 'Trasladado', value: 'TRASLADADO' },
];

export const PERIODOS_SELECT_OPTIONS = [
  { label: 'primer periodo', value: 'primerPeriodo' },
  { label: 'segundo periodo', value: 'segundoPeriodo' },
  { label: 'tercer periodo', value: 'tercerPeriodo' },
  { label: 'cuarto periodo', value: 'cuartoPeriodo' },
];
