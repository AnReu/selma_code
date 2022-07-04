import React from 'react';
import Box from '@mui/material/Box';
// import DefaultSearchBar from './features/search/DefaultSearchBar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DDBGLogo from './assets/SELMA-Logo_code.svg';
import SearchForm from './features/SearchForm';

export default function HomePage() {
  const theme = useTheme();

  const logoClass = theme.palette.mode === 'light' ? 'dark-logo' : 'light-logo';

  return (
    <Box sx={{
      textAlign: 'center',
      minWidth: '80%',
    }}
    >
      <img
        className={logoClass}
        src={DDBGLogo}
        alt="Dresden DB Group"
      />
      <Typography
        variant="h3"
        sx={{
          color: 'text.primary',
          fontWeight: 800,
          mb: 2,
        }}
      >
        SELMA
      </Typography>
      {/* <DefaultSearchBar /> */}
      <SearchForm />
    </Box>
  );
}
