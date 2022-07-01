import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from '../features/navbar/SettingsDialog';
import { ColorModeContext } from '../ColorModeContext';
import { ThemeSwitch } from '../ThemeSwitch';
import ExamplesDialog from '../features/examples/ExamplesDialog';

export default function MainLayout() {
  const colorMode = React.useContext(ColorModeContext);
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

          <ThemeSwitch onClick={colorMode.toggleColorMode} />

          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            onClick={() => setIsDialogOpen(true)}
            sx={{ ml: 2 }}
          >
            <SettingsIcon />
          </IconButton>

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
