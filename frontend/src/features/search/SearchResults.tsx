import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { listItemClasses } from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { skipToken } from '@reduxjs/toolkit/query/react';
import Button from '@mui/material/Button';
import SearchResult from './SearchResult';
import { Result, useGetResultsQuery } from '../../app/services/results';
import { useAppSelector } from '../../app/hooks';
import { selectParams } from './searchSlice';

const RESULTS_PER_PAGE = 10;

export default function SearchResults() {
  const params = useAppSelector(selectParams);
  const {
    data, isLoading, isFetching, isError,
  } = useGetResultsQuery(params ?? skipToken);
  const [, setCurrentPageResults] = React.useState<Result[]>([]);
  const [endIndex, setEndIndex] = React.useState(RESULTS_PER_PAGE);

  const updateShownResults = () => {
    if (data) {
      const shownResults = data.results.slice(0, endIndex);
      setCurrentPageResults(shownResults);
    }
  };

  const handleLoadMore = () => {
    setEndIndex(endIndex + RESULTS_PER_PAGE);
  };

  React.useEffect(() => {
    updateShownResults();
  }, []);

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

  if (!data) {
    return null;
  }

  if (data.results.length === 0) {
    return (
      <Box
        sx={{
          px: 16,
          py: 2,
          bgcolor: 'background.paper',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="textPrimary">0 results</Typography>
      </Box>
    );
  }

  return (
    <Stack sx={{ px: 16, py: 2 }}>
      <Typography variant="h4" color="textPrimary">Results:</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 3 }}>
        {data.results.slice(0, endIndex).map(
          (result) => <SearchResult key={result.id} result={result} />,
        )}
      </List>
      <Button
        sx={{ p: 2, mt: 2 }}
        variant="contained"
        onClick={handleLoadMore}
        disabled={endIndex >= data.results.length}
      >
        Load more
      </Button>
    </Stack>
  );
}
