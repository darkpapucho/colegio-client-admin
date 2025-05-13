const NUMERO_PERIODOS = 4;

export const CURSOS_VALIDOS = [
  { label: 'Matemática', key: 'matematica', code: 'MA', short: 'MATE' },
  { label: 'Comunicación', key: 'comunicacion', code: 'CO', short: 'COMU' },
  { label: 'Ciencia y Tecnología', key: 'cienciaTecnologia', code: 'CT', short: 'CCTT' },
  { label: 'Personal Social', key: 'personalSocial', code: 'PS', short: 'PPSS' },
  { label: 'Arte y Cultura', key: 'arteCultura', code: 'AC', short: 'ARTE' },
  { label: 'Educación Física', key: 'educacionFisica', code: 'EF', short: 'EEFF' },
  { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
  { label: 'Geografía', key: 'geografia', code: 'GF', short: 'GEOG' },
  { label: 'Historia', key: 'historia', code: 'HI', short: 'HIST' },
  { label: 'Aritmética', key: 'aritmetica', code: 'AR', short: 'ARIT' },
  { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
  { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
  { label: 'Física', key: 'fisica', code: 'FI', short: 'FISI' },
  { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },
  { label: 'Computación', key: 'computacion', code: 'CP', short: 'COMPU' },
  { label: 'Biología', key: 'biologia', code: 'BI', short: 'BIOL' },
  { label: 'Química', key: 'quimica', code: 'QI', short: 'QUIM' },
  { label: 'Psicomotriz', key: 'psicomotriz', code: 'PZ', short: 'PSIC' },
  { label: 'Raz. Verbal', key: 'razVerbal', code: 'RV', short: 'RVER' },
  { label: 'Raz. Matemático', key: 'razMatematico', code: 'RM', short: 'RMAT' },
  { label: 'Comp. Linguística', key: 'compLinguistica', code: 'CL', short: 'CLIN' },
  { label: 'Plan Lector', key: 'planLector', code: 'PL', short: 'PLEC' },
  { label: 'Ortografía', key: 'ortografia', code: 'OR', short: 'ORTG' },
  { label: 'Ed. Cívica', key: 'edCivica', code: 'EC', short: 'ECIV' },
  {
    label: 'Literatura',
    key: 'literatura',
    code: 'LT',
    short: 'LITE',
  },
] as const;

export type CURSO = (typeof CURSOS_VALIDOS)[number];
export type CURSO_LABEL = Pick<(typeof CURSOS_VALIDOS)[number], 'label'>;
export type CURSO_KEY = Pick<(typeof CURSOS_VALIDOS)[number], 'key'>;

export type CURSO_NOTAS_RECORD = {
  curso: CURSO;
  notas: [number, number, number, number];
};

export const DUMMY_DATA: CURSO_NOTAS_RECORD[] = [
  {
    curso: {
      label: 'Geografía',
      key: 'geografia',
      code: 'GF',
      short: 'GEOG',
    },
    notas: [18, 12, 3, 20],
  },
  {
    curso: {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    notas: [12, 15, 16, 19],
  },
];
