import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import SettingsDialog from '../features/navbar/SettingsDialog';
import ExamplesDialog from '../features/examples/ExamplesDialog';
import SystemSettings from '../features/navbar/SystemSettings';

export default function MainLayout() {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

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
      <SettingsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box>
  );
}
