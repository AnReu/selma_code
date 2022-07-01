import React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 0,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

interface CustomTextFieldProps {
  value: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function CustomTextField(props: CustomTextFieldProps) {
  const {
    value,
    name,
    onChange: handleChange,
  } = props;

  return (
    <div>
      <FormControl variant="standard">
        <BootstrapInput
          id="demo-customized-select-native"
          name={name}
          value={value}
          onChange={handleChange}
        />
      </FormControl>
    </div>
  );
}
