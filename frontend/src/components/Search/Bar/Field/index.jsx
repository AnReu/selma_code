// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */

import React, { useState } from 'react';
import {
  FormControl, FormHelperText, IconButton, Input, InputLabel,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  icon: {
    padding: '6px',
  },
  label: {
    marginTop: '10px',
  },
}));

const SearchField = ({
  title, onQueryChange, onEnter, multiline, validation = (x) => x,
}) => {
  const classes = useStyles();
  const [value, handleValueChange] = useState('');

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onEnter();
    }
  };

  const handleQueryChange = (event) => {
    handleValueChange(event.target.value);
    onQueryChange(validation(event.target.value));
  };

  const id = `searchfield-${title.name}`;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor={id} className={classes.label}>{title.label}</InputLabel>
        <Input
          id={id}
          value={value}
          fullWidth
          multiline={multiline}
          rowsMax="10"
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
    </div>
  );
};

export default SearchField;
