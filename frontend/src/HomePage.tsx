import React from 'react';
import Box from '@mui/material/Box';
// import DefaultSearchBar from './features/search/DefaultSearchBar';
import DDBGLogo from './assets/dresden_db_group_logo.svg';
import SearchForm from './features/SearchForm';

export default function HomePage() {
  return (
    <Box sx={{
      textAlign: 'center',
      minWidth: '80%',
    }}
    >
      <img style={{ maxWidth: '160px', margin: '32px' }} src={DDBGLogo} alt="Dresden DB Group" />
      {/* <DefaultSearchBar /> */}
      <SearchForm />
    </Box>
  );
}
