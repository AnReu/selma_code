import React from 'react';

import { TextField } from '@material-ui/core';

const SearchField = ({ title, onQueryChange }) => {

  return (
    <div>
      <TextField
        id="standard-basic"
        fullWidth
        multiline
        rowsMax="10"
        label={title.label}
        InputProps={title.inputProps}
        onChange={onQueryChange}
      />
    </div>
  );
};

export default SearchField;