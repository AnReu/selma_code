/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  CircularProgress, Collapse,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { useAddQueryTemplateMutation } from '../../../services/queryTemplates';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },

  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function QueryTemplateCreator(props) {
  // Props
  const {
    isOpen, onClose,
  } = props;

  // Hooks
  // Local State
  // TODO: consider renaming vars to sth like: 'formLanguage', 'formName', ...
  const [modelName, setModelName] = React.useState('');
  const [modelLanguage, setModelLanguage] = React.useState('');
  const [database, setDatabase] = React.useState('');
  const [queryText, setQueryText] = React.useState('');
  const [templateName, setTemplateName] = React.useState('');
  const [hasError] = React.useState(false);
  const [success] = React.useState(false);
  // Global State
  const [addQueryTemplate, { isLoading }] = useAddQueryTemplateMutation();
  const currentQueryText = useSelector((state) => state.queryText);
  const currentModel = useSelector((state) => state.model);
  const currentModelLanguage = useSelector((state) => state.language);
  React.useEffect(() => {
    setModelName(currentModel);
    setModelLanguage(currentModelLanguage);
    setQueryText(currentQueryText);
  }, [currentQueryText]);

  // Styles
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  // Handlers
  const canSave = [templateName, modelName, modelLanguage, queryText].every(Boolean) && !isLoading;
  const resetForm = () => {
    setModelName('');
    setModelLanguage('');
    setQueryText(currentQueryText);
    setTemplateName('');
  };
  const handleSaveQueryTemplate = async () => {
    if (canSave) {
      try {
        const newTemplate = {
          name: templateName, queryText, modelName, modelLanguage, user: 'Homer',
        };
        await addQueryTemplate(newTemplate).unwrap();
        resetForm();
        onClose();
      } catch (err) {
        console.error('Failed to create the template: ', err);
      }
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // const handleSaveQueryTemplate = () => {
  //
  //   return addQueryTemplate(newTemplate).then(() => {
  //     console.log('lol');
  //   });

  // setSuccess(false);
  // setIsLoading(true);
  //
  // const body = JSON.stringify({
  //   name: templateName, queryText, modelName, modelLanguage, user: 'Homer',
  // });
  // const headers = new Headers({ 'content-type': 'application/json' });
  //
  // fetch('/api/v1/query-templates', {
  //   method: 'POST',
  //   body,
  //   cache: 'no-cache',
  //   headers,
  // })
  //   .then((response) => {
  //     if (![200, 404].includes(response.status)) {
  //       // throw Error(`Bad status code! ErrorCode: ${response.status}`);
  //     }
  //
  //     return response.json();
  //   })
  //   .then((json) => {
  //     const newQueryTemplate = json.queryTemplate;
  //     setSuccess(true);
  //     setIsLoading(false);
  //     onClose();
  //     onCreateTemplate(newQueryTemplate);
  //   })
  //   .catch(() => {
  //     setSuccess(true);
  //     setHasError(true);
  //     setIsLoading(false);
  //     // throw Error(e.message !== 'Bad status code!' ? e.message : '');
  //   });
  // };

  return (
    <Dialog onClose={() => onClose()} open={isOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Query Template</DialogTitle>
      <Collapse in={hasError}>
        <Alert severity="error">Oops!</Alert>
      </Collapse>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="templateName"
              name="templateName"
              label="Template's name"
              fullWidth
              value={templateName}
              onChange={(e) => { setTemplateName(e.target.value); }}
              onBlur={(e) => setTemplateName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Model</InputLabel>
              <Select
                labelId="model-name-label"
                id="model-name"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                input={<Input />}
              >
                <MenuItem value="PyterrierModel">PyTerrierModel</MenuItem>
                <MenuItem value="VectorModel">VectorModel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Model language</InputLabel>
              <Select
                labelId="model-language-label"
                id="model-language"
                value={modelLanguage}
                onChange={(e) => setModelLanguage(e.target.value)}
                input={<Input />}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="german">German</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Database</InputLabel>
              <Select
                disabled
                labelId="database-label"
                id="database"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                input={<Input />}
              >
                <MenuItem value="stackoverflow">Stackoverflow</MenuItem>
                <MenuItem value="codesearchnet">CodeSearchNet</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="queryText"
              name="queryText"
              label="Query"
              fullWidth
              value={queryText}
              onChange={(e) => { setQueryText(e.target.value); }}
              onBlur={(e) => setQueryText(e.target.value)}
            />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose()}>
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={isLoading}
            onClick={handleSaveQueryTemplate}
          >
            Create
          </Button>
          {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>

      </DialogActions>
    </Dialog>
  );
}
