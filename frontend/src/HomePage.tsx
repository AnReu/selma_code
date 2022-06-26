/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DefaultSearchBar from './features/search/DefaultSearchBar';
import DDBGLogo from './dresden_db_group_logo.svg';

const pages = ['Home', 'Separated', 'ID or URL', 'File'];

// TODO: bgcolor: #282828 should get color directly from theme instead of using hard-coded strings

export default function HomePage() {
  // https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        height: '100%',
      }}
    >
      <Grid item xs={12} sx={{ flex: '0 1 auto' }}>
        <AppBar
          position="static"
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid white',
            bgcolor: '#282828',
          }}
        >
          <Toolbar>
            <Box>
              {pages.map((page) => (
                <Button variant="text" sx={{ color: 'white' }}>
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12} sx={{ flex: '1 1 auto', bgcolor: '#282828' }}>
        <Stack sx={{ textAlign: 'center' }}>

          <Container maxWidth="md">

            <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center' }} className="logo-container">
              <img src={DDBGLogo} alt="SELMA" />
            </Box>
            <h1 style={{ color: '#ffffff' }}>SELMA</h1>

            <DefaultSearchBar />
          </Container>
        </Stack>

      </Grid>
    </Grid>
  );
}
