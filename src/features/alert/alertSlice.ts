import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

type AlertTypes = "success" | "error" | "info" | "warning";
export type Alert = {
  type: AlertTypes,
  message: string,
  open: boolean
}
const initialState: Alert = {
  type: "success",
  message: "",
  open: false
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{type: AlertTypes, message: string}>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.open = true
    },
    hideAlert: (state) => {
      state.open = false;
    }
  }
});
export const {showAlert, hideAlert} = alertSlice.actions;

export const getAlertInfo = (state: RootState): Alert => state.alert; 

export default alertSlice.reducer;
