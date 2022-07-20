import { Box, Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteAddress, getAddressList, getSelectedAddress, selectAddress } from '../addressSlice';
import { Address } from '../types';
import { showAlert } from '../../alert/alertSlice';
import { useState } from 'react';



const AddressList = () => {
  const dispatch = useAppDispatch();

  const rows = useAppSelector(getAddressList);
  const selectedModel = useAppSelector(getSelectedAddress);

  const columns: GridColDef[] = [
    {
      field: 'line_1', headerName: 'Line1', width: 200
    },
    {
      field: 'line_2', headerName: 'Line2', width: 150
    },
    {
      field: 'line_3', headerName: 'Line3', width: 150
    },
    {
      field: 'town', headerName: 'Town', width: 150
    },
    {
      field: 'postcode', headerName: 'Postcode', width: 120
    },
    {
      field: 'country', headerName: 'Country', width: 180
    },  
    {
      field: 'actions', 
      headerName: 'Action',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<Address>) => {
        const onDeleteAddress = (aId: number) => {
          const idx = rows.findIndex(item => item.id == aId);
          dispatch(deleteAddress(idx));
          dispatch(showAlert({type: "success", message: "The address was deleted from the book."}));
          //Remove selected address if it was deleted
          if (selectedModel && aId == selectedModel.id) {
            dispatch(selectAddress(null));
          }
        }
        return <IconButton onClick={() => onDeleteAddress(params.row.id)}><DeleteIcon /></IconButton>
      }
    }
  ]


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onSelectionModelChange={(newSelection) =>{
          const nAddress = rows.find(item => item.id == newSelection[0])
          dispatch(selectAddress(!nAddress ? null : nAddress))
        }}
        selectionModel={!selectedModel ? [] : [selectedModel.id]}
      />
    </Box>
  );
}

export default AddressList;