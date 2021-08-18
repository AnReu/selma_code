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
  CircularProgress,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

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
  const classes = useStyles();
  const {
    // eslint-disable-next-line no-unused-vars
    isOpen, currentQueryText, currentModelLanguage, currentModel, onClose,
  } = props;

  const [modelName, setModelName] = React.useState('');
  const [modelLanguage, setModelLanguage] = React.useState('');
  const [database, setDatabase] = React.useState('');
  const [queryText, setQueryText] = React.useState('');
  const [templateName, setTemplateName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setModelName(currentModel);
    setModelLanguage(currentModelLanguage);
    setQueryText(currentQueryText);
  }, [currentQueryText]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleSaveQueryTemplate = () => {
    setSuccess(false);
    setIsLoading(true);

    const body = JSON.stringify({
      name: templateName, queryText, modelName, modelLanguage, user: 'Homer',
    });
    const headers = new Headers({ 'content-type': 'application/json' });

    fetch('/api/v1/query-templates', {
      method: 'POST',
      body,
      cache: 'no-cache',
      headers,
    })
      .then((response) => {
        if (![200, 404].includes(response.status)) {
          throw Error(`Bad status code! ErrorCode: ${response.status}`);
        }

        return response;
      })
      .then((response) => {
        if (response.status === 404) {
          throw Error(response.json.error);
        }
        setSuccess(true);
        setIsLoading(false);
        onClose();
      })
      .catch((e) => {
        setSuccess(true);
        setIsLoading(false);
        throw Error(e.message !== 'Bad status code!' ? e.message : '');
      });
  };

  return (
    <Dialog onClose={() => onClose()} open={isOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Query Template</DialogTitle>
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
              onChange={(e) => setTemplateName(e.target.value)}
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
                <MenuItem value="PyterrierModel">PyTerrier</MenuItem>
                <MenuItem value="VectorModel">Vector</MenuItem>
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
                <MenuItem value="English">Stackoverflow</MenuItem>
                <MenuItem value="German">CodeSearchNet</MenuItem>
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
            />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose()}>
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
