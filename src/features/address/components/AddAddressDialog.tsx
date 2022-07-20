import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { showAlert } from "../../alert/alertSlice";
import { addAddress, addIfNotExist, getNewAddressId, getAddressList, isShowAddAddressDialog, toggleAddAddressDialog, toggleSearchByPostcodeDialog } from "../addressSlice";
import { Address } from "../types";
import CountrySelect from "./CountrySelect";
import { PrimaryButton, SecondaryButton } from "./CustomButton";

type OptionsFlag<Type> = {
  [Property in keyof Type as Exclude<Property, "id">]: boolean
}

export default function AddAddressDialog() {
  const dispatch = useAppDispatch();
  
  const newId = useAppSelector(getNewAddressId);
  const initForm: Address = {
    id: newId,
    line_1: "",
    line_2: "",
    line_3: "",
    postcode: "",
    town: "",
    country: ""
  }
  const [form, setForm] = useState(initForm);

  const initError: OptionsFlag<Address>  = {
    line_1: false,
    line_2: false,
    line_3: false,
    postcode: false,
    town: false,
    country: false
  }
  const [errors, setErrors] = useState(initError);

  const isOpen = useAppSelector(isShowAddAddressDialog);

  const handleClickOpen = () => {
    setForm(initForm);
    setErrors(initError);  
    dispatch(toggleAddAddressDialog(true));
  };
  const handleClose = () => {
    dispatch(toggleAddAddressDialog(false));
  };

  const handleInput = (value: string, name: keyof Address) => {
    setForm({...form, [name]: value});
    setErrors({...errors, [name]: !value});
  }


  const submitHandler = () => {
    let hasError = false;
    if (!form.line_1) {
      hasError = true;
      setErrors((prev) => ({...prev, "line_1": true}));
    }
    if (!form.postcode) {
      hasError = true;
      setErrors((prev) => ({...prev, "postcode": true}));
    }
    if (!form.town) {
      hasError = true;
      setErrors((prev) => ({...prev, "town": true}));
    }
    if (!form.country) {
      hasError = true;
      setErrors((prev) => ({...prev, "country": true}));
    }
    if (hasError) {
      dispatch(showAlert({type: "error", message: "Please complete the required fields."}));
      return;
    }
    dispatch(addIfNotExist(form));
    dispatch(toggleAddAddressDialog(false));
  }

  const showSearchByPostcodeDialog = () => {
    dispatch(toggleAddAddressDialog(false));
    dispatch(toggleSearchByPostcodeDialog(true));
  }

  return (
    <div>
      <SecondaryButton onClick={handleClickOpen}>Add new address</SecondaryButton>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
        <DialogTitle>Add new address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the address information in detail.
          </DialogContentText>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  margin="dense"
                  id="line_1"
                  label="Line1"
                  type="text"
                  value={form.line_1}
                  onChange={(e) => handleInput(e.target.value, "line_1")}
                  onBlur={(e) => handleInput(e.target.value, "line_1")}
                  onFocus={() => setErrors({...errors, "line_1": false})}
                  error={errors["line_1"]}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  id="line_2"
                  label="Line2"
                  type="text"
                  fullWidth
                  value={form.line_2}
                  onChange={(e) => handleInput(e.target.value, "line_2")}                  
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  id="line_3"
                  label="Line3"
                  type="text"
                  fullWidth
                  value={form.line_3}
                  onChange={(e) => handleInput(e.target.value, "line_3")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required={true}
                  margin="dense"
                  id="town"
                  label="Town"
                  type="text"
                  fullWidth
                  value={form.town}
                  error={errors.town}
                  onChange={(e) => handleInput(e.target.value, "town")}
                  onBlur={(e) => handleInput(e.target.value, "town")}
                  onFocus={() => setErrors({...errors, "town": false})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required={true}
                  margin="dense"
                  id="postcode"
                  label="Postcode"
                  type="text"
                  fullWidth
                  value={form.postcode}
                  error={errors.postcode}
                  onChange={(e) => handleInput(e.target.value, "postcode")}
                  onBlur={(e) => handleInput(e.target.value, "postcode")}
                  onFocus={() => setErrors({...errors, "postcode": false})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CountrySelect error={errors.country} handleInput={handleInput} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{padding: 2, justifyContent: "space-between"}}>
          <Button onClick={showSearchByPostcodeDialog}>Search by postcode</Button>
          <Box>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={submitHandler}>Save</PrimaryButton>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}