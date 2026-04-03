import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Curso {
  label: string;
  key: string;
  code: string;
  short: string;
}

const Cursos: Curso[] = [];

const cursosSlice = createSlice({
  name: 'cursos',
  initialState: Cursos,
  reducers: {
    setCursos(state, action: PayloadAction<Curso[]>) {
      state = action.payload;
      return state;
    },
  },
});

export default cursosSlice.reducer;

export const { setCursos } = cursosSlice.actions;
