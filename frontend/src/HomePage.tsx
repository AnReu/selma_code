/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Box from '@mui/material/Box';
import DefaultSearchBar from './features/search/DefaultSearchBar';
import DDBGLogo from './assets/dresden_db_group_logo.svg';

export default function HomePage() {
  const [showTooltip, setShowTooltip] = React.useState(true);
  return (
    <Box sx={{ textAlign: 'center' }}>
      <img style={{ maxWidth: '100px', margin: '16px' }} src={DDBGLogo} alt="Dresden DB Group" />

      <DefaultSearchBar />

    </Box>
  );
}
