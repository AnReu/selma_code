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
  // eslint-disable-next-line no-unused-vars
  MenuItem, DialogActions, Button, Select, InputLabel, FormControl,
} from '@material-ui/core';

import './QueryTemplateDialog.css';

export default function QueryTemplateDialog({
  open, models, templates, onClose, onSelect,
}) {
  const [model, setModel] = React.useState('');
  const [name] = React.useState('');

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleClickListItem = (item) => {
    onSelect(item);
  };

  const handleCloseDialog = () => {
    onClose();
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

          <FormControl fullWidth>
            <InputLabel id="demo-mutiple-name-label">Model</InputLabel>
            <Select
              label="Model"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={model}
              defaultValue=""
              onChange={handleModelChange}
            >
              {models.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </form>
        <h3>Examples:</h3>
        <Divider />
        <List component="nav" className="list">
          {templates.map((template) => (
            <ListItem button className="list-item" onClick={() => handleClickListItem(template)} key={template.id}>
              <ListItemText primary={`${template.name}`} />
            </ListItem>
          ))}
        </List>

      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseDialog}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
