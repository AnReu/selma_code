/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Box from '@mui/material/Box';
import CustomSelect from './CustomSelect';
import CustomTextField from './CustomTextField';

export default function SearchForm() {
  const [db, setDb] = React.useState('');
  const [model, setModel] = React.useState('');
  const [index, setIndex] = React.useState('');
  const [text, setText] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'db') {
      setDb(value);
    } else if (name === 'model') {
      setModel(value);
    } else if (name === 'index') {
      setIndex(value);
    } else {
      setText(value);
    }
  };

  return (
    <Box
      component="form"
      role="search"
      sx={{
        display: 'flex',
        minWidth: '240px',
        flexGrow: 1,
      }}
    >
      <CustomSelect
        label="Database"
        value={db}
        name="db"
        onChange={handleChange}
      >
        <option value="codeSearchNet">codeSearchNet</option>
        <option value="postdb">postdb</option>
      </CustomSelect>
      <CustomSelect
        label="Model"
        value={model}
        name="model"
        onChange={handleChange}
      >
        <option value="codeSearchNet">PyterrierModel</option>
        <option value="postdb">VectorModel</option>
      </CustomSelect>
      <CustomSelect
        label="Index"
        value={index}
        name="index"
        onChange={handleChange}
      >
        <option value="default">Default</option>
        <option value="code">Code</option>
      </CustomSelect>
      <CustomTextField
        value={text}
        onChange={handleChange}
      />
    </Box>
  );
}
