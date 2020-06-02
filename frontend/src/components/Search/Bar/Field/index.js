import React from 'react';

import { TextField } from '@material-ui/core';

const SearchField = ({ title, onQueryChange, onEnter, multiline, validation = x => x }) => {

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onEnter();
    }
  };

  const handleQueryChange = (event) => {
    onQueryChange(validation(event.target.value));
  }

  return (
    <div>
      <TextField
        id="standard-basic"
        fullWidth
        multiline={multiline}
        rowsMax="10"
        label={title.label}
        InputProps={title.inputProps}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchField;