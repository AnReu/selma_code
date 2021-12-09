import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { listItemClasses } from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query/react';
import SearchResult from './SearchResult';
import { useGetResultsQuery } from '../../app/services/results';
import { useAppSelector } from '../../app/hooks';
import { selectParams } from './searchSlice';

export default function SearchResults() {
  const params = useAppSelector(selectParams);
  const {
    data, isLoading, isFetching, isError,
  } = useGetResultsQuery(params ?? skipToken);
  const results = data?.results;

  if (isError) {
    return (
      <Paper
        sx={{
          px: 16,
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="textPrimary">Oops... something went wrong</Typography>
      </Paper>
    );
  }

  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          px: 16,
          py: 2,
          bgcolor: 'background.default',
          [`& .active, & .${listItemClasses.root}:hover`]: {
            color: 'red',
            fontWeight: 'bold',
            '& svg': {
              fill: 'red',
            },
          },
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  if (!!results && results.length === 0) {
    return (
      <Box
        sx={{
          px: 16,
          py: 2,
          bgcolor: 'background.paper',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" color="textPrimary">No posts :(</Typography>
      </Box>
    );
  } if (!results) {
    // TODO: fix this grid system
    return (
      <Box sx={{ flexGrow: 1, height: '100%' }} />
    );
  }

  return (
    <Paper
      sx={{
        px: 16,
        py: 2,
      }}
    >
      <Typography variant="h4" color="textPrimary">Results:</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 3 }}>
        {results?.map((result) => <SearchResult key={result.id} result={result} />)}
      </List>
    </Paper>
  );
}
