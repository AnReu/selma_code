import React  from 'react';

import { CircularProgress, Typography } from '@material-ui/core';

import Result from "./Result";

const SearchResults = ({ results, isLoading=false }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      {isLoading
        ? <CircularProgress />
        : <React.Fragment>
            {results.length
              ? <Typography variant="h6">Search Results:</Typography>
              : null
            }

            {results.map(result =>
              <Result result={result} expanded={expanded} handleExpand={handleExpand} key={result.id} />
            )}
          </React.Fragment>
      }
    </React.Fragment>
  );
};

export default SearchResults;