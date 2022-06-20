import React from 'react';
import Stack from '@mui/material/Stack';
import NavBar from '../navbar/NavBar';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Stack id="search-page-stack">
      <NavBar />
      <SearchResults />
    </Stack>
  );
}
