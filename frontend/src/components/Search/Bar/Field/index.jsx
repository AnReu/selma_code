// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */

import React, { useState } from 'react';
import {
  FormControl, FormHelperText, IconButton, Input, InputLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ClearIcon from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  icon: {
    padding: '6px',
  },
  label: {
    marginTop: '10px',
  },
}));

const SearchField = ({
  title, onChange, onEnter, multiline, validation = (x) => x,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onEnter();
    }
  };

  const handleQueryChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(validation(newValue));
  };

  const id = `searchfield-${title.name}`;

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor={id} className={classes.label}>{title.label}</InputLabel>
        <Input
          id={id}
          value={value}
          fullWidth
          multiline={multiline}
          maxRows="10"
          endAdornment={(
            <IconButton className={classes.icon} onClick={() => handleQueryChange({ target: { value: '' } })}>
              <ClearIcon />
            </IconButton>
          )}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
        <FormHelperText id={`${id}-text`}>
          <span>{title.helperText}</span>
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default SearchField;
