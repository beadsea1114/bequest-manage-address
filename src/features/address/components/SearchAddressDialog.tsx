import { Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { hideAlert, showAlert } from "../../alert/alertSlice";
import { searchAddressByPostCode, searchPostCodeByKeyword } from "../addressAPI";
import { addIfNotExist, isShowSearchByPostcodeDialog, selectAddress, toggleAddAddressDialog, toggleSearchByPostcodeDialog } from "../addressSlice";
import { Address } from "../types";
import { PrimaryButton, SecondaryButton } from "./CustomButton";


const AddressGrid = ({rows} : {rows: Address[]}) => {
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: 'line_1', headerName: 'Line1', width: 150, flex: 1
    },
    {
      field: 'line_2', headerName: 'Line2', width: 150, flex: 1
    },
    {
      field: 'line_3', headerName: 'Line3', width: 150, flex: 1
    },
    {
      field: 'town', headerName: 'Town', width: 150, flex: 1
    },
    {
      field: 'postcode', headerName: 'Postcode', width: 120, flex: 1
    },
    {
      field: 'country', headerName: 'Country', width: 180, flex: 1
    },  
    {
      field: 'actions', 
      headerName: '',
      sortable: false, 
      flex: 1,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<Address>) => {
        const onSelectAddress = (aId: number) => {
          dispatch(hideAlert());
          const row: Address | undefined = rows.find(item => item.id == aId);
          if (row) {
            dispatch(addIfNotExist(row));
            dispatch(selectAddress(row));
          }
        }
        return <SecondaryButton onClick={() => onSelectAddress(params.row.id)}>Select</SecondaryButton>
      }
    }
  ];

  return (
    <Box sx={{ height: 380, width: '100%' }}>
      <Typography variant="h3" marginTop={2} fontSize={"1.25rem"}>Addresses</Typography>
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  )
}

export default function SearchAddressDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isShowSearchByPostcodeDialog);
  const handleClickOpen = () => {
    dispatch(toggleSearchByPostcodeDialog(true));
    setLoading(false);
    setPostcodeInput("");
    setPostcodeOptions([]);
    setPostcode("");
    setAddressList([]);
  };

  const handleClose = () => {
    dispatch(toggleSearchByPostcodeDialog(false));
  };

  const [loading, setLoading] = useState(false);
  const [postcodeInput, setPostcodeInput] = useState("");
  const [postcodeOptions, setPostcodeOptions] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [addressList, setAddressList] = useState<Address[]>([]);

  const getPostCodesDelayed = useCallback(
    debounce((v) => {
      if (!v) {
        setLoading(false);
        setPostcodeOptions([]);
        setAddressList([]);
      } else {
        setLoading(true);
        dispatch(hideAlert());
        setAddressList([]);
        searchPostCodeByKeyword(v)
          .then(rsp => {
            if (!rsp.length) {
              dispatch(showAlert({type: "warning", message: "Please enter correct postcode."}));
            }
            setPostcodeOptions(rsp);
          })
          .catch(err => {
            dispatch(showAlert({type: "error", message: err.message}));
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }, 300), []);
  
  const getAddressByPostcode = (postcode: string | null) => {
    if (!postcode) {
    } else {
      setLoading(true);
      searchAddressByPostCode(postcode)
        .then(rsp => {
          if (rsp.Message) {
            dispatch(showAlert({type: "error", message: rsp.Message}));
          } else {
            const formattedList: Address[] = rsp.addresses.map((item: string, idx: number) => {
              const arr = item.split(",");
              return {
                "id": idx,
                "line_1": arr[0],
                "line_2": arr[1],
                "line_3": arr[2],
                "town": arr[5],
                "postcode": postcode,
                "country": "England"
              };
            });
            console.log(formattedList);
            setAddressList(formattedList);
          }
        })
        .catch(err => {
          dispatch(showAlert({type: "error", message: err.message}));
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const showAddAddressDialog = () => {
    dispatch(toggleSearchByPostcodeDialog(false));
    dispatch(toggleAddAddressDialog(true));
  }
  return (
    <div>
      <PrimaryButton onClick={handleClickOpen}>Search by postcode</PrimaryButton>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Search by postcode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the address information in detail.
          </DialogContentText>
          <Box paddingTop={1}>
            <Autocomplete
              id="postcode"
              options={postcodeOptions}
              sx={{width: "100%"}}
              value={postcode}
              getOptionLabel={(option) => option}
              inputValue={postcodeInput}
              noOptionsText={"No postcode found"}
              loadingText={"Search..."}
              freeSolo={true}
              onInputChange={(e, v) => {
                setPostcodeInput(v);
                getPostCodesDelayed(v)
              }}
              onChange={(event: any, newValue: string | null) => {
                setPostcode(!newValue ? "" : newValue)
                getAddressByPostcode(newValue);
              }}
              filterOptions={(x) => x}
              loading={loading}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  fullWidth={true}
                  label="Postcode"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    )
                  }}
                />
              )}
            />
          </Box>
          <AddressGrid rows={addressList} />
        </DialogContent>
        <Divider />
        <DialogActions sx={{padding: 2, justifyContent: "space-between"}}>
          <Button onClick={showAddAddressDialog}>Add new address</Button>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}