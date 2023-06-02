/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { IndexRequest, emptyIndexRequest, useIndexRequestMutations } from '../../recoil/selectors';

export default function SelfIndexingDialog() {
  const { sendRequest } = useIndexRequestMutations();
  const [isOpen, setIsOpen] = React.useState(false);
  const [form, setForm] = React.useState<IndexRequest>(emptyIndexRequest);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setForm(emptyIndexRequest);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: checked }));
  };

  const handleApply = () => {
    // setOpen(false);
    sendRequest(form);
    // setConfigs(configsForm);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        name="list"
        onClick={handleOpen}
      >
        Index repo
      </Button>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Add Code Base</DialogTitle>

        <DialogContent>
          <Stack component="form" spacing={2}>
            <TextField
              label="Git Repository Url"
              name="url"
              variant="filled"
              fullWidth
              value={form.url}
              onChange={handleChange}
            />

            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Code Expansion Settings</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={form.codeTrans} onChange={handleChecked} name="codeTrans" />}
                  label="CodeTrans"
                />
                <FormControlLabel
                  control={<Checkbox checked={form.plbart} onChange={handleChecked} name="plbart" />}
                  label="PLBART"
                />
              </FormGroup>
            </FormControl>

            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Selected Configurations</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={form.stringBased} onChange={handleChecked} name="stringBased" />}
                  label="String-based Indexing"
                />
                <FormControlLabel
                  control={<Checkbox checked={form.neuralApplied} onChange={handleChecked} name="neuralApplied" />}
                  label="Neural Index (Applied)"
                />
                <FormControlLabel
                  control={<Checkbox checked={form.neuralTrained} onChange={handleChecked} name="neuralTrained" />}
                  label="Neural Index (Trained)"
                />
              </FormGroup>
            </FormControl>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}
