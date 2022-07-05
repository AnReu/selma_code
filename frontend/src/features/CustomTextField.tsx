import React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0 4px 4px 0',
    borderTop: '1px solid #ced4da',
    borderRight: '1px solid #ced4da',
    borderBottom: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

interface CustomTextFieldProps {
  value: string;
  name?: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  endAdornment: React.ReactNode;
  error: boolean;
  helperText: string;
}

export default function CustomTextField(props: CustomTextFieldProps) {
  const {
    value,
    name,
    label,
    onChange: handleChange,
    endAdornment,
    error,
    helperText,
  } = props;

  return (
    <FormControl variant="standard" sx={{ flexGrow: 1 }}>
      <InputLabel shrink>{label}</InputLabel>
      <BootstrapInput
        id="demo-customized-select-native"
        name={name}
        value={value}
        onChange={handleChange}
        endAdornment={endAdornment}
        error={error}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
