// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import Result from './Result';

const SearchResults = ({ results, isLoading = false, onRelevanceCheck }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {isLoading
        ? <CircularProgress />
        : (
          <>
            {results.length
              ? <Typography variant="h6">Search Results:</Typography>
              : null}

            {results.map((result) => (
              <Result
                key={result.id}
                result={result}
                expanded={expanded}
                onExpand={handleExpand}
                onRelevanceCheck={onRelevanceCheck}
              />
            ))}
          </>
        )}
    </>
  );
};

export default SearchResults;
