import React from 'react';

import { TextField } from '@material-ui/core';

const SearchField = ({ title, onQueryChange, onEnter, validation }) => {

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
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
        rowsMax="10"
        label={title.displayLabel}
        InputProps={title.inputProps}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchField;