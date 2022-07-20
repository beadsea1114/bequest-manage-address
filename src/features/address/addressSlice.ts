import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { showAlert } from '../alert/alertSlice';
import { READY } from './statuses';
import { AddressBookState, Address, Status } from './types';

const initialState: AddressBookState = {
  list: [],
  showAddAddressDialog: false,
  showSearchByPostcodeDialog: false,
  selected: null
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.list.push(action.payload);
    },
    deleteAddress: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    selectAddress: (state, action: PayloadAction<Address | null>) => {
      state.selected = action.payload;
    },
    toggleAddAddressDialog: (state, action: PayloadAction<boolean>) => {
      state.showAddAddressDialog = action.payload;
    },
    toggleSearchByPostcodeDialog: (state, action: PayloadAction<boolean>) => {
      state.showSearchByPostcodeDialog = action.payload;
    }
  }
});

export const {addAddress, deleteAddress, selectAddress, toggleSearchByPostcodeDialog, toggleAddAddressDialog} = addressSlice.actions;

//Define Selectors
export const getAddressList = (state: RootState): Address[] => state.address.list;

export const getSelectedAddress = (state: RootState): Address | null => state.address.selected;

export const isShowAddAddressDialog = (state: RootState): boolean => state.address.showAddAddressDialog;

export const isShowSearchByPostcodeDialog = (state: RootState): boolean => state.address.showSearchByPostcodeDialog;

export const getNewAddressId = (state: RootState): number => {
  if (state.address.list.length === 0)
    return 1;
  else
    return Math.max(...state.address.list.map(v => v.id)) + 1;
}

export const addIfNotExist = (address: Address): AppThunk =>
  (dispatch, getState) => {
    const addressList = getAddressList(getState());
    let isExist = addressList.some((v) => {
      return JSON.stringify({...v, id: null}) == JSON.stringify({...address, id: null});
    })
    if (!isExist) {
      dispatch(addAddress(address));
      dispatch(showAlert({type: "success", message: "The address added into the book."}));
    } else {
      dispatch(showAlert({type: "error", message: "The same address already exists in the book."}));
    }
  };

export default addressSlice.reducer;