import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries, CountryType } from '../countries';
import { Address } from '../types';

type handlerType = (value: string, name: keyof Address) => void;

export default function CountrySelect({error, handleInput}: {error: boolean, handleInput: handlerType}) {
  return (
    <Autocomplete
      id="country"
      sx={{ width: "100%" }}
      options={countries}
      onChange={(event: any, newValue: CountryType | null) => {
        handleInput(!newValue ? "" : newValue.label, "country")
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          label="Country"
          required={true}
          placeholder='Choose a country'
          fullWidth
          margin="dense"
          autoComplete='off'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', 
          }}
        />
      )}
    />
  );
}