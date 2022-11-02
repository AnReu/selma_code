import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SelmaLogo from './assets/SELMA-Logo_code.svg';
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
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          mb: 6,
        }}
      >
        <img
          className={logoClass}
          src={SelmaLogo}
          alt="Selma retrieval system"
        />
        <Typography
          variant="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
          }}
        >
          SELMA
        </Typography>
      </Stack>

      <SearchForm />
    </Box>
  );
}
