// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem, DialogActions, Button,
} from '@material-ui/core';

// const defaultForm = {
//   name: 'lol',
//   model: null,
//   language: null,
// };

export default function QueryTemplateDialog(props) {
  const { open, form, models } = props;

  // const handleCloseDialog = () => {
  //   setShowDialog(false);
  // };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Query Template</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you run the same query many times, then make your life easier and create
          a template for it. With query templates you can run queries with just one click 🥸
        </DialogContentText>
        <form>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Template's name"
            type="text"
            fullWidth
            value={form.name}
          />
          <TextField
            id="modelSelector"
            select
            label="Model"
            value={form.model}
            fullWidth
          >
            {models.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="languageSelector"
            select
            label="Language"
            value={form.language}
            fullWidth
          >
            {models.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
