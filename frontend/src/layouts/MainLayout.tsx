import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';

const pages = ['Home', 'Separated', 'ID or URL', 'File'];

export default function MainLayout() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      bgcolor: 'background.paper',
    }}
    >
      <AppBar
        position="fixed"
        elevation={0}
      >
        <Toolbar>
          <Box>
            {pages.map((page) => (
              <Button key={page} href={`/${page}`} variant="text" sx={{ color: 'white' }}>
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '64px',
      }}
      >
        <Outlet />
      </main>

    </Box>
  );
}
