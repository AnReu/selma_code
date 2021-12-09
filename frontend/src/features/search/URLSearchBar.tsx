import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setURL, setMode, setParams, selectURL,
} from './searchSlice';

export default function URLSearchBar() {
  const dispatch = useAppDispatch();

  const url = useAppSelector(selectURL);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setURL((event.target.value as string)));
  };

  const handleSearch = () => {
    dispatch(setMode('url'));
    dispatch(setURL(url));
    dispatch(setParams());
  };

  return (
    <Stack spacing={2}>
      <TextField
        sx={{ width: '400px' }}
        value={url}
        id="filled-basic"
        label="Id or URL"
        variant="filled"
        onChange={handleFormChange}
      />

      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Stack>
  );
}
