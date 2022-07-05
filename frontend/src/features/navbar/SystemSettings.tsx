import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRecoilState } from 'recoil';
import { ColorModeContext } from '../../ColorModeContext';
import { ThemeSwitch } from '../../ThemeSwitch';
import { Config, configsState, useConfigsMutations } from '../../recoil/selectors';

export default function SystemSettings() {
  const colorMode = React.useContext(ColorModeContext);
  const { updateConfigs } = useConfigsMutations();
  const [open, setOpen] = React.useState(false);
  const [configs, setConfigs] = useRecoilState(configsState);
  const [configsForm, setConfigsForm] = React.useState<Config>(configs);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setConfigsForm(configs);
  };

  const handleApply = () => {
    setOpen(false);
    updateConfigs(configsForm);
    setConfigs(configsForm);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setConfigsForm((values: Config) => ({
      ...values,
      allowed_search_modes: {
        ...values.allowed_search_modes, [name]: checked,
      },
    }));
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
          <Stack spacing={2}>
            <Typography variant="subtitle1">Allowed search modes:</Typography>
            <FormGroup row sx={{ justifyContent: 'space-evenly' }}>
              <FormControlLabel
                control={(
                  <Checkbox
                    disabled
                    onChange={handleCheckboxChange}
                    checked
                    name="default"
                    inputProps={{ 'aria-label': 'allow default search' }}
                  />
                )}
                label="Default"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    onChange={handleCheckboxChange}
                    checked={configsForm.allowed_search_modes.separated}
                    name="separated"
                    inputProps={{ 'aria-label': 'allow separated search' }}
                  />
                )}
                label="Separated"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    onChange={handleCheckboxChange}
                    checked={configsForm.allowed_search_modes.url}
                    name="url"
                    inputProps={{ 'aria-label': 'allow url or id search' }}
                  />
                )}
                label="URL or ID"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    onChange={handleCheckboxChange}
                    checked={configsForm.allowed_search_modes.file}
                    name="file"
                    inputProps={{ 'aria-label': 'allow file search' }}
                  />
                )}
                label="File"
              />
            </FormGroup>
            <Typography variant="subtitle1">Theme:</Typography>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <Typography>Dark</Typography>
              <ThemeSwitch onClick={colorMode.toggleColorMode} />
              <Typography>Light</Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
