import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SnackbarState {
  time: number;
  text: string;
  open: boolean;
}

const initialState: SnackbarState = {
  time: 5000,
  text: 'initial text',
  open: false,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    toggleSnackbar: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setSnackbarText, toggleSnackbar } = snackbarSlice.actions;
export const selectSnackbar = (state: RootState) => state.snackbar;
export default snackbarSlice.reducer;
