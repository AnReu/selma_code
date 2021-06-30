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

export default function QueryTemplateDialog({
  open, form, models, languages,
}) {
  const [model, setModel] = React.useState(null);
  const [language, setLanguage] = React.useState(null);

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

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
            id="select-model"
            select
            label="Model"
            value={model}
            onChange={handleModelChange}
            fullWidth
          >
            {models.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="select-language"
            select
            label="Language"
            value={language}
            onChange={handleLanguageChange}
            fullWidth
          >
            {languages.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
