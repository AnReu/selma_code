import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from '../features/navbar/SettingsDialog';
import { ColorModeContext } from '../ColorModeContext';
import { ThemeSwitch } from '../ThemeSwitch';

const pages = [
  { name: 'Home', value: '/' },
  { name: 'Separated', value: '/separated' },
  { name: 'ID or URL', value: '/url' },
  { name: 'File', value: '/file' },
];

export default function MainLayout() {
  const colorMode = React.useContext(ColorModeContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

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
              <Button key={page.name} href={`${page.value}`} variant="text" sx={{ color: 'white' }}>
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <ThemeSwitch onClick={colorMode.toggleColorMode} />

          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
            onClick={() => setIsDialogOpen(true)}
            sx={{ ml: 2 }}
          >
            <SettingsIcon />
          </IconButton>

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
      <SettingsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box>
  );
}
