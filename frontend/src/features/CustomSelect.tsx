import React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    borderRight: '1px solid #ced4da',
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

interface CustomSelectProps {
  value: string;
  name: string;
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

export default function CustomSelect(props: CustomSelectProps) {
  const {
    value, name, onChange: handleChange, children,
  } = props;

  return (
    <div>
      <FormControl variant="standard">
        <NativeSelect
          id="demo-customized-select-native"
          name={name}
          value={value}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {children}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
