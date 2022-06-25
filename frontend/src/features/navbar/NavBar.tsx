/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import TemplateListDialog from '../templates/TemplateListDialog';
import { configsState } from '../../recoil/selectors';
import SettingsDialog from './SettingsDialog';

const navItems = ['Default', 'Separated', 'ID or URL', 'File'];

export default function NavBar() {
  const configs = useRecoilValue(configsState);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <Box sx={{ bgcolor: 'pink' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            RetrievalSystem
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', mx: 2 }}>
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <TemplateListDialog />

          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
            onClick={() => setIsDialogOpen(true)}
          >
            <SettingsIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <SettingsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box>
  );
}
