// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem, DialogActions, Button,
} from '@material-ui/core';

import './QueryTemplateDialog.css';

export default function QueryTemplateDialog({ open, models, templates }) {
  const [model, setModel] = React.useState(null);
  const [name] = React.useState(null);

  const handleModelChange = (event) => {
    setModel(event.target.value);
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
            value={name}
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
        </form>
        <h3>Examples:</h3>
        <Divider />
        <List component="nav" className="list">
          {templates.map((template) => (
            <ListItem button className="list-item">
              <ListItemText primary={`${template.name}`} />
            </ListItem>
          ))}
        </List>

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
