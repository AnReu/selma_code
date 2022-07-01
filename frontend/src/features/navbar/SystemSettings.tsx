import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { ColorModeContext } from '../../ColorModeContext';
import { ThemeSwitch } from '../../ThemeSwitch';

export default function SystemSettings() {
  const colorMode = React.useContext(ColorModeContext);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.error('TODO');
    setOpen(false);
  };

  const handleApply = () => {
    console.error('TODO');
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        sx={{ ml: 2 }}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <ThemeSwitch onClick={colorMode.toggleColorMode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
