import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Year } from '../../../types/enums';

const initialState: Year = (new Date().getFullYear() + '') as Year;

const añoSlice = createSlice({
  name: 'año',
  initialState,
  reducers: {
    setAño(state, action: PayloadAction<Year>) {
      state = action.payload;
      return state;
    },
  },
});

export default añoSlice.reducer;

export const { setAño } = añoSlice.actions;
