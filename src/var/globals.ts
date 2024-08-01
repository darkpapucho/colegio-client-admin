import { CURSO_BOLETA_NOTA } from '../types/documento';

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
  secundaria: [
    { label: 'Primero', value: 'PRIMERO' },
    { label: 'Segundo', value: 'SEGUNDO' },
    { label: 'Tercero', value: 'TERCERO' },
    { label: 'Cuarto', value: 'CUARTO' },
    { label: 'Quinto', value: 'QUINTO' },
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

//secundaria

export const CURSOS_SECUNDARIA_BOLETA_NOTAS: CURSO_BOLETA_NOTA[] = [
  { label: 'Arte y Cultura', key: 'arteCultura', competencias: ['Aprecia las manifestaciones artístico-culturales.', 'Crea proyectos desde los lenguajes artísticos.'] },
  { label: 'Inglés', key: 'ingles', competencias: ['Se comunica oralmente en inglés.', 'Lee diversos tipos de textos en inglés.', 'Escribe diversos tipos textos en inglés.'] },
  {
    label: 'Ciencia y Tecnología',
    key: 'cienciaTecnologia',
    competencias: ['Indaga mediante métodos científicos.', 'Explica el mundo basándose en hechos científicos.', 'Diseña y construye soluciones tecnológicas.'],
  },
  { label: 'Comunicación', key: 'comunicacion', competencias: ['Se comunica oralmente.', 'Lee diversos tipos de textos.', 'Escribe diversos tipos de textos.'] },
  {
    label: 'Educación Física',
    key: 'educacionFisica',
    competencias: ['Se desenvuelve de manera autónoma.', 'Asume una vida saludable.', 'Interactúa a través de sus habilidades sociomotrices.'],
  },
  { label: 'Religión', key: 'religion', competencias: ['Construye su identidad como persona amada por Dios.', 'Asume a Dios en su proyecto de vida.'] },
  {
    label: 'Matemática',
    key: 'matematica',
    competencias: [
      'Resuelve problemas de cantidad.',
      'Resuelve problemas de regularidad, equivalencia y cambio',
      'Resuelve problemas de movimiento y localización.',
      'Resuelve problemas de datos e incertidumbre.',
    ],
  },
  {
    label: 'Personal Social',
    key: 'personalSocial',
    competencias: [
      'Construye su identidad.',
      'Convive y participa democráticamente.',
      'Construye interpretaciones históricas.',
      'Gestiona responsablemente el espacio y el ambiente',
      'Gestiona responsablemente los recursos económicos.',
    ],
  },

  {
    label: 'Competencias Transversales',
    key: 'competenciasTransversales',
    competencias: ['Se desenvuelve en entornos virtuales generados por las TIC.', 'Gestiona su aprendizaje de manera autónoma.'],
  },
];

//PRIMARIA

export const CURSOS_PRIMARIA_BOLETA_NOTAS: CURSO_BOLETA_NOTA[] = [
  { label: 'Arte y Cultura', key: 'arteCultura', competencias: ['Aprecia las manifestaciones artístico-culturales.', 'Crea proyectos desde los lenguajes artísticos.'] },
  { label: 'Inglés', key: 'ingles', competencias: ['Se comunica oralmente en inglés.', 'Lee diversos tipos de textos en inglés.', 'Escribe diversos tipos textos en inglés.'] },
  {
    label: 'Ciencia y Tecnología',
    key: 'cienciaTecnologia',
    competencias: ['Indaga mediante métodos científicos.', 'Explica el mundo basándose en hechos científicos.', 'Diseña y construye soluciones tecnológicas.'],
  },
  { label: 'Comunicación', key: 'comunicacion', competencias: ['Se comunica oralmente.', 'Lee diversos tipos de textos.', 'Escribe diversos tipos de textos.'] },
  {
    label: 'Educación Física',
    key: 'educacionFisica',
    competencias: ['Se desenvuelve de manera autónoma.', 'Asume una vida saludable.', 'Interactúa a través de sus habilidades sociomotrices.'],
  },
  { label: 'Religión', key: 'religion', competencias: ['Construye su identidad como persona amada por Dios.', 'Asume a Dios en su proyecto de vida.'] },
  {
    label: 'Matemática',
    key: 'matematica',
    competencias: [
      'Resuelve problemas de cantidad.',
      'Resuelve problemas de regularidad, equivalencia y cambio',
      'Resuelve problemas de movimiento y localización.',
      'Resuelve problemas de datos e incertidumbre.',
    ],
  },
  {
    label: 'Personal Social',
    key: 'personalSocial',
    competencias: [
      'Construye su identidad.',
      'Convive y participa democráticamente.',
      'Construye interpretaciones históricas.',
      'Gestiona responsablemente el espacio y el ambiente',
      'Gestiona responsablemente los recursos económicos.',
    ],
  },

  {
    label: 'Competencias Transversales',
    key: 'competenciasTransversales',
    competencias: ['Se desenvuelve en entornos virtuales generados por las TIC.', 'Gestiona su aprendizaje de manera autónoma.'],
  },
];

//INICIAL 3y4 AÑOS

export const CURSOS_INICIAL_3_4_BOLETA_NOTAS: CURSO_BOLETA_NOTA[] = [
  { label: 'Ciencia y Tecnología', key: 'cienciaTecnologia', competencias: ['Indaga e investiga mediante métodos científicos.'] },
  {
    label: 'Comunicación',
    key: 'comunicacion',
    competencias: ['Se comunica oralmente.', 'Lee diversos tipos de textos.', 'Escribe diversos tipos de textos.', 'Crea proyectos desde los lenguajes del arte.'],
  },
  { label: 'Psicomotriz', key: 'psicomotriz', competencias: ['Se desenvuelve de manera autónoma'] },
  { label: 'Matemática', key: 'matematica', competencias: ['Resuelve problemas de cantidad.', 'Resuelve problemas de forma y movimiento.'] },
  { label: 'Personal Social', key: 'personalSocial', competencias: ['Construye su identidad.', 'Convive y participa democráticamente.', 'Construye una conciencia histórica.'] },
];

//INICIAL 5 AÑOS
export const CURSOS_INICIAL_5_BOLETA_NOTAS: CURSO_BOLETA_NOTA[] = [
  ...CURSOS_INICIAL_3_4_BOLETA_NOTAS,
  {
    label: 'Competencias Transversales',
    key: 'competenciasTransversales',
    competencias: ['Se desenvuelve en entornos virtuales generados por la TIC.', 'Gestiona su aprendizaje de manera autónoma.'],
  },
  { label: 'Inglés', key: 'ingles', competencias: ['Se comunica oralmente en inglés.', 'Lee diversos tipos de textos en inglés.', 'Escribe diversos tipos textos en inglés.'] },
];

export const SALONES_SELECT_OPTONS = {
  inicial: [
    { label: 'Grupo 3 años A', value: 'Grupo 3 años A' },
    { label: 'Grupo 3 años B', value: 'Grupo 3 años B' },
    { label: 'Grupo 4 años A', value: 'Grupo 4 años A' },
    { label: 'Grupo 4 años B', value: 'Grupo 4 años B' },
    { label: 'Grupo 5 años A', value: 'Grupo 5 años A' },
    { label: 'Grupo 5 años B', value: 'Grupo 5 años B' },
  ],
  primaria: [
    { label: 'Primero A', value: 'Primero A' },
    { label: 'Primero B', value: 'Primero B' },
    { label: 'Segundo A', value: 'Segundo A' },
    { label: 'Segundo B', value: 'Segundo B' },
    { label: 'Tercero A', value: 'Tercero A' },
    { label: 'Tercero B', value: 'Tercero B' },
    { label: 'Cuarto A', value: 'Cuarto A' },
    { label: 'Cuarto B', value: 'Cuarto B' },
    { label: 'Quinto A', value: 'Quinto A' },
    { label: 'Quinto B', value: 'Quinto B' },
    { label: 'Sexto A', value: 'Sexto A' },
    { label: 'Sexto B', value: 'Sexto B' },
  ],
  secundaria: [
    { label: 'Primero A', value: 'Primero A' },
    { label: 'Primero B', value: 'Primero B' },
    { label: 'Segundo A', value: 'Segundo A' },
    { label: 'Segundo B', value: 'Segundo B' },
    { label: 'Tercero A', value: 'Tercero A' },
    { label: 'Tercero B', value: 'Tercero B' },
    { label: 'Cuarto A', value: 'Cuarto A' },
    { label: 'Cuarto B', value: 'Cuarto B' },
    { label: 'Quinto A', value: 'Quinto A' },
    { label: 'Quinto B', value: 'Quinto B' },
  ],
};
