import React from 'react';
import Stack from '@mui/material/Stack';
import NavbarWithTabs from '../navbar/NavbarWithTabs';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Stack id="search-page-stack">
      <NavbarWithTabs />
      <SearchResults />
    </Stack>
  );
}
