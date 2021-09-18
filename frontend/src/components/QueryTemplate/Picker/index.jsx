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
  LinearProgress, Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import {
  useGetQueryTemplatesQuery,
  useDeleteQueryTemplateMutation,
} from '../../../services/queryTemplates';
import actions from '../../../actions';

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
  // Style
  const classes = useStyles();

  // Props
  const {
    isOpen, onClose,
  } = props;

  // Hooks
  const { data: templates = [] } = useGetQueryTemplatesQuery();
  const [
    deleteQueryTemplate,
    { isLoading: isDeleting, isError, isSuccess },
  ] = useDeleteQueryTemplateMutation();
  const dispatch = useDispatch();

  // Handlers
  const handleDeleteTemplate = async (template) => {
    console.log(isDeleting);
    try {
      await deleteQueryTemplate(template.id).unwrap();
      // onClose();
    } catch (err) {
      console.error('Failed to delete the template: ', err);
    }
  };
  const handleSelectTemplate = (template) => {
    const { modelName, modelLanguage, queryText } = template;
    dispatch(actions.setLanguage(modelLanguage));
    dispatch(actions.setModel(modelName));
    dispatch(actions.setQueryText(queryText));
    onClose();
  };

  const alert = () => (
    isError
      ? { severity: 'error', msg: 'Oops. Failed to delete the template.' }
      : { severity: 'success', msg: 'Template deleted.' }
  );

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      classes={{ paper: classes.paper }}
    >

      { isDeleting && <LinearProgress /> }

      <DialogTitle id="form-dialog-title">Query Templates</DialogTitle>

      <Collapse in={isError || isSuccess}>
        <Alert severity={alert().severity}>{alert().msg}</Alert>
      </Collapse>

      <DialogContent className={classes.content}>
        <DialogContentText>
          If you run the same query many times, then make your life easier and create
          a template for it. With query templates you can run queries with just one click 🥸
        </DialogContentText>

        <Divider />

        <List component="nav">
          {templates.map((template) => (
            <ListItem button className="list-item" onClick={() => handleSelectTemplate(template)} key={template.id}>
              <ListItemText primary={`${template.name}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTemplate(template)}>
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
