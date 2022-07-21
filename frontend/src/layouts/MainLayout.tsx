import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { useTheme } from '@mui/material/styles';
import ExamplesDialog from '../features/examples/ExamplesDialog';
import SystemSettings from '../features/navbar/SystemSettings';
import { configsState } from '../recoil/selectors';

export default function MainLayout() {
  // const theme = useTheme();
  const configs = useRecoilValue(configsState);

  const { allowed_search_modes } = configs;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ bgcolor: 'background.paper' }}
      >
        <Toolbar>
          {Object.entries(allowed_search_modes).map(([mode, isAllowed]) => (
            <Button
              disabled={!isAllowed}
              key={mode}
              sx={{
                color: 'text.primary',
              }}
            >
              {mode}
            </Button>
          ))}

          <Box sx={{ flexGrow: 1 }} />

          <ExamplesDialog />

          <SystemSettings />

        </Toolbar>
      </AppBar>

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: '64px',
          minWidth: '80%',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </main>
    </Box>
  );
}
