import React from 'react';

import { TextField } from '@material-ui/core';

const SearchField = ({ title, onQueryChange, onEnter }) => {

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onEnter();
    }
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        fullWidth
        rowsMax="10"
        label={title.label}
        InputProps={title.inputProps}
        onChange={onQueryChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchField;