import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCode,
  selectEquation,
  setCode, setEquation, setMode, setParams,
} from './searchSlice';

export default function SeparatedSearchBar() {
  const dispatch = useAppDispatch();
  const code = useAppSelector(selectCode);
  const equation = useAppSelector(selectEquation);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setCode((event.target as HTMLInputElement).value as string));
  };

  // eslint-disable-next-line max-len
  const handleEquationChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setEquation((event.target as HTMLInputElement).value as string));
  };

  const handleSearch = () => {
    dispatch(setMode('separated'));
    dispatch(setCode(code));
    dispatch(setEquation(equation));
    dispatch(setParams());
  };

  return (
    <Stack spacing={2}>
      <TextField
        sx={{ width: '400px' }}
        value={code}
        id="filled-basic"
        label="Code"
        variant="filled"
        onChange={handleCodeChange}
      />

      <TextField
        sx={{ width: '400px' }}
        value={equation}
        id="filled-basic"
        label="Equations"
        variant="filled"
        onChange={handleEquationChange}
      />

      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Stack>
  );
}
