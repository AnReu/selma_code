import React  from 'react';

import { CircularProgress, Typography, List, ListSubheader } from '@material-ui/core';

import Result from "./Result";

const SearchResults = ({ results, isLoading=false }) => {
  return (
    <React.Fragment>
      {isLoading
        ? <CircularProgress />
        : <List style={{marginTop: 20}}>
            {results.length
              ? <ListSubheader disableSticky={true} disableGutters={true}>
                  <Typography variant="h6">Search Results:</Typography>
                </ListSubheader>
              : null
            }

            {results.map(result =>
              <Result result={result} key={result.id} />
            )}
          </List>
      }
    </React.Fragment>
  );
};

export default SearchResults;