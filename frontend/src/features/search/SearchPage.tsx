import React from 'react';
import Stack from '@mui/material/Stack';
import { useRecoilValue } from 'recoil';
import NavBar from '../navbar/NavBar';
import SearchResults from './SearchResults';
import { dataStructureQueryState } from '../../recoil/selectors';

export default function SearchPage() {
  // Fetch data structure
  useRecoilValue(dataStructureQueryState);

  return (
    <Stack id="search-page-stack">
      <NavBar />
      <SearchResults />
    </Stack>
  );
}
