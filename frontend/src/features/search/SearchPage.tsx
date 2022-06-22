import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../navbar/NavBar';
import SearchResults from './SearchResults';
import {
  dataStructureQueryState,
  configsState,
} from '../../recoil/selectors';

export default function SearchPage() {
  // Fetch data
  const dataStructure = useRecoilValueLoadable(dataStructureQueryState);
  const configs = useRecoilValueLoadable(configsState);

  if (configs.state === 'hasError') {
    return <h1>ERROR: Configs could not be fetched</h1>;
  }

  if (dataStructure.state === 'hasError') {
    return <h1>ERROR: Data structure could not be fetched</h1>;
  }

  if (dataStructure.state === 'loading' || configs.state === 'loading') {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Stack id="search-page-stack">
      <NavBar />
      <SearchResults />
    </Stack>
  );
}
