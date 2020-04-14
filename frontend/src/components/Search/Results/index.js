import React  from 'react';

import { Box, Typography} from '@material-ui/core';

const SearchResults = ({ results }) => {
  return (
    <Box style={{marginTop: 20}}>
      <Typography variant="h6">Search Results:</Typography>
      {results.map((result, i) =>
        <Typography variant="body1" key={i}>{ result }</Typography>
      )}
    </Box>
  );
};

export default SearchResults;