/* eslint-disable react/prop-types */
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
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    maxHeight: theme.spacing(80),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
}));

export default function QueryTemplatePicker(props) {
  const classes = useStyles();
  const {
    isOpen, onClose, onSelect, onDeleteTemplate, templates,
  } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="form-dialog-title">Query Templates</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          If you run the same query many times, then make your life easier and create
          a template for it. With query templates you can run queries with just one click 🥸
        </DialogContentText>

        <Divider />

        <List component="nav">
          {templates.map((template) => (
            <ListItem button className="list-item" onClick={() => onSelect(template)} key={template.id}>
              <ListItemText primary={`${template.name}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTemplate(template)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

      </DialogContent>
    </Dialog>
  );
}
