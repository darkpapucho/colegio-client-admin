export type AnuncioProfesor = {
  title: string;
  date: string;
  content: string;
  _id: string;
  salones: string[];
};

export type AnuncioGeneral = {
  title: string;
  content: string;
  date: string;
  _id: string;
  userId: string;
};
