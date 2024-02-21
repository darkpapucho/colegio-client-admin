import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nivel } from '../../../types/enums';

const initialState: Nivel | '' = '';

const nivelSlice = createSlice({
  name: 'nivel',
  initialState,
  reducers: {
    setNivel<Nivel>(state: Nivel, action: PayloadAction<Nivel>) {
      state = action.payload;
      return state;
    },
  },
});

export default nivelSlice.reducer;

export const { setNivel } = nivelSlice.actions;
