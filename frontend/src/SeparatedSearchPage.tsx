import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { queryParametersState } from './recoil/atoms';

export default function SeparatedSearchPage() {
  const [query, setQuery] = useRecoilState(queryParametersState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSearch = () => {
    console.error('TODO');
  };

  return (
    <Stack spacing={2}>
      <TextField
        sx={{ width: '400px' }}
        value={query.code}
        id="filled-basic"
        label="Code"
        variant="filled"
        onChange={handleChange}
      />

      <TextField
        sx={{ width: '400px' }}
        value={query.equation}
        id="filled-basic"
        label="Equations"
        variant="filled"
        onChange={handleChange}
      />

      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Stack>

  );
}
