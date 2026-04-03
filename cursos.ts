//PRIMERO
interface CURSO {
  label: string;
  key: string;
  code: string;
  short: string;
}
interface SALON {
  grado: string;
  cursos: CURSO[];
}

const primero: SALON = {
  grado: 'PRIMERO',
  cursos: [
    { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
    {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
    {
      label: 'Arte y Cultura',
      key: 'arteCultura',
      code: 'AC',
      short: 'ARTE',
    },
    {
      label: 'Computación',
      key: 'computacion',
      code: 'CP',
      short: 'COMPU',
    },
    { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
    {
      label: 'Educación Física',
      key: 'educacionFisica',
      code: 'EF',
      short: 'EEFF',
    },
    { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },
    {
      label: 'Personal Social',
      key: 'personalSocial',
      code: 'PS',
      short: 'PPSS',
    },
    {
      label: 'Gramática',
      key: 'gramatica',
      code: 'GR',
      short: 'GRAM',
    },

    {
      label: 'Expresión Oral',
      key: 'expresionOral',
      code: 'EO',
      short: 'ExpO',
    },
    { label: 'Redacción', key: 'redaccion', code: 'RD', short: 'REDA' },
    {
      label: 'Habilidad Verbal',
      key: 'habilidadVerbal',
      code: 'HV',
      short: 'HABV',
    },
    {
      label: 'Habilidad Matemática',
      key: 'habilidadMatematica',
      code: 'HM',
      short: 'HABM',
    },
  ],
};
const segundo: SALON = {
  grado: 'SEGUNDO',
  cursos: [
    { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
    {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
    {
      label: 'Arte y Cultura',
      key: 'arteCultura',
      code: 'AC',
      short: 'ARTE',
    },
    {
      label: 'Computación',
      key: 'computacion',
      code: 'CP',
      short: 'COMPU',
    },
    { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
    {
      label: 'Educación Física',
      key: 'educacionFisica',
      code: 'EF',
      short: 'EEFF',
    },
    { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },
    {
      label: 'Personal Social',
      key: 'personalSocial',
      code: 'PS',
      short: 'PPSS',
    },
    {
      label: 'Gramática',
      key: 'gramatica',
      code: 'GR',
      short: 'GRAM',
    },

    {
      label: 'Expresión Oral',
      key: 'expresionOral',
      code: 'EO',
      short: 'ExpO',
    },
    { label: 'Redacción', key: 'redaccion', code: 'RD', short: 'REDA' },
    {
      label: 'Habilidad Verbal',
      key: 'habilidadVerbal',
      code: 'HV',
      short: 'HABV',
    },
    {
      label: 'Habilidad Matemática',
      key: 'habilidadMatematica',
      code: 'HM',
      short: 'HABM',
    },
  ],
};
const tercero: SALON = {
  grado: 'TERCERO',
  cursos: [
    { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
    {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
    {
      label: 'Arte y Cultura',
      key: 'arteCultura',
      code: 'AC',
      short: 'ARTE',
    },
    {
      label: 'Computación',
      key: 'computacion',
      code: 'CP',
      short: 'COMPU',
    },
    { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
    {
      label: 'Educación Física',
      key: 'educacionFisica',
      code: 'EF',
      short: 'EEFF',
    },
    { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },
    {
      label: 'Personal Social',
      key: 'personalSocial',
      code: 'PS',
      short: 'PPSS',
    },
    {
      label: 'Gramática',
      key: 'gramatica',
      code: 'GR',
      short: 'GRAM',
    },

    {
      label: 'Expresión Oral',
      key: 'expresionOral',
      code: 'EO',
      short: 'ExpO',
    },
    { label: 'Redacción', key: 'redaccion', code: 'RD', short: 'REDA' },
    {
      label: 'Habilidad Verbal',
      key: 'habilidadVerbal',
      code: 'HV',
      short: 'HABV',
    },
    {
      label: 'Habilidad Matemática',
      key: 'habilidadMatematica',
      code: 'HM',
      short: 'HABM',
    },
  ],
};
const cuarto: SALON = {
  grado: 'CUARTO',
  cursos: [
    { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
    {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
    {
      label: 'Habilidad Matemática',
      key: 'habilidadMatematica',
      code: 'HM',
      short: 'HABM',
    },
    {
      label: 'Arte y Cultura',
      key: 'arteCultura',
      code: 'AC',
      short: 'ARTE',
    },
    {
      label: 'Computación',
      key: 'computacion',
      code: 'CP',
      short: 'COMPU',
    },
    { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
    {
      label: 'Educación Física',
      key: 'educacionFisica',
      code: 'EF',
      short: 'EEFF',
    },
    { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },

    {
      label: 'Lenguaje',
      key: 'lenguaje',
      code: 'LE',
      short: 'LENG',
    },
    {
      label: 'Comp. Linguística',
      key: 'compLinguistica',
      code: 'CL',
      short: 'CLIN',
    },
    {
      label: 'Habilidad Verbal',
      key: 'habilidadVerbal',
      code: 'HV',
      short: 'HABV',
    },

    { label: 'Biología', key: 'biologia', code: 'BI', short: 'BIOL' },
    { label: 'Física', key: 'fisica', code: 'FI', short: 'FISI' },
    { label: 'Química', key: 'quimica', code: 'QI', short: 'QUIM' },
    { label: 'Geografía', key: 'geografia', code: 'GF', short: 'GEOG' },
    { label: 'Historia', key: 'historia', code: 'HI', short: 'HIST' },
  ],
};
const quinto: SALON = {
  grado: 'QUINTO',
  cursos: [
    { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
    {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
    {
      label: 'Habilidad Matemática',
      key: 'habilidadMatematica',
      code: 'HM',
      short: 'HABM',
    },
    {
      label: 'Arte y Cultura',
      key: 'arteCultura',
      code: 'AC',
      short: 'ARTE',
    },
    {
      label: 'Computación',
      key: 'computacion',
      code: 'CP',
      short: 'COMPU',
    },
    { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
    {
      label: 'Educación Física',
      key: 'educacionFisica',
      code: 'EF',
      short: 'EEFF',
    },
    { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },

    {
      label: 'Lenguaje',
      key: 'lenguaje',
      code: 'LE',
      short: 'LENG',
    },
    {
      label: 'Comp. Linguística',
      key: 'compLinguistica',
      code: 'CL',
      short: 'CLIN',
    },
    {
      label: 'Habilidad Verbal',
      key: 'habilidadVerbal',
      code: 'HV',
      short: 'HABV',
    },

    { label: 'Biología', key: 'biologia', code: 'BI', short: 'BIOL' },
    { label: 'Física', key: 'fisica', code: 'FI', short: 'FISI' },
    { label: 'Química', key: 'quimica', code: 'QI', short: 'QUIM' },
    { label: 'Geografía', key: 'geografia', code: 'GF', short: 'GEOG' },
    { label: 'Historia', key: 'historia', code: 'HI', short: 'HIST' },
    {
      label: 'Literatura',
      key: 'literatura',
      code: 'LT',
      short: 'LITE',
    },
  ],
};
const sexto: SALON = {
  grado: 'SEXTO',
  cursos: [
    { label: 'Álgebra', key: 'algebra', code: 'AL', short: 'ALGE' },
    {
      label: 'Aritmética',
      key: 'aritmetica',
      code: 'AR',
      short: 'ARIT',
    },
    { label: 'Geometría', key: 'geometria', code: 'GT', short: 'GEOM' },
    {
      label: 'Habilidad Matemática',
      key: 'habilidadMatematica',
      code: 'HM',
      short: 'HABM',
    },
    {
      label: 'Arte y Cultura',
      key: 'arteCultura',
      code: 'AC',
      short: 'ARTE',
    },
    {
      label: 'Computación',
      key: 'computacion',
      code: 'CP',
      short: 'COMPU',
    },
    { label: 'Religión', key: 'religion', code: 'RE', short: 'RELI' },
    {
      label: 'Educación Física',
      key: 'educacionFisica',
      code: 'EF',
      short: 'EEFF',
    },
    { label: 'Inglés', key: 'ingles', code: 'IN', short: 'INGL' },

    {
      label: 'Lenguaje',
      key: 'lenguaje',
      code: 'LE',
      short: 'LENG',
    },
    {
      label: 'Comp. Linguística',
      key: 'compLinguistica',
      code: 'CL',
      short: 'CLIN',
    },
    {
      label: 'Habilidad Verbal',
      key: 'habilidadVerbal',
      code: 'HV',
      short: 'HABV',
    },

    { label: 'Biología', key: 'biologia', code: 'BI', short: 'BIOL' },
    { label: 'Física', key: 'fisica', code: 'FI', short: 'FISI' },
    { label: 'Química', key: 'quimica', code: 'QI', short: 'QUIM' },
    { label: 'Geografía', key: 'geografia', code: 'GF', short: 'GEOG' },
    { label: 'Historia', key: 'historia', code: 'HI', short: 'HIST' },
    {
      label: 'Literatura',
      key: 'literatura',
      code: 'LT',
      short: 'LITE',
    },
    {
      label: 'Trigonometría',
      key: 'trigonometria',
      code: 'TR',
      short: 'TRIG',
    },
  ],
};
