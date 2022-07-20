import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import addressReducer from '../features/address/addressSlice';
import alertReducer from '../features/alert/alertSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    address: addressReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
