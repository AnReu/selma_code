/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/control-has-associated-label */

import {
  Alert, Box, CircularProgress, Snackbar, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';
import * as React from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import {
  baseURL,
  dataStructureQueryState,
  dbsState,
} from '../../recoil/selectors';

const COLBERT_NAME = 'PyterrierColbert';
const BM25_NAME = 'PyterrierModel';
const CODETRANS_NAME = 'CODETRANS';
const PLBART_NAME = 'PLBART';
const KEYWORDS_NAME = 'KEYWORDS';

interface expansionMethods {
  [CODETRANS_NAME]: boolean;
  [PLBART_NAME]: boolean;
  [KEYWORDS_NAME]: boolean;
}

export interface IndexRequest {
  url: string;
  model: string | null;
  database: string;
  index: string;
  expansionMethods: expansionMethods;
  neuralIndexingMethod: string | null;
  collectionAction: 'CREATE' | 'UPDATE' | null;
  indexingAction: 'CREATE' | 'UPDATE' | null;
}

export const emptyIndexRequest: IndexRequest = {
  url: 'https://github.com/jabedhasan21/java-hello-world-with-maven.git',
  model: null,
  database: '',
  index: '',
  expansionMethods: {
    [CODETRANS_NAME]: false,
    [PLBART_NAME]: false,
    [KEYWORDS_NAME]: false,
  },
  neuralIndexingMethod: null,
  collectionAction: null,
  indexingAction: null,
};

export default function SelfIndexingDialog() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);
  const [form, setForm] = React.useState<IndexRequest>(emptyIndexRequest);
  const [indexes, setIndexes] = React.useState<string[]>([]);
  const databases = useRecoilValue(dbsState);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const refreshDataStructure = useRecoilRefresher_UNSTABLE(dataStructureQueryState);
  const dataStructure = useRecoilValue(dataStructureQueryState);

  React.useEffect(() => {
    if (form.model == null) return;

    // filter indexes
    if (dataStructure[form.database] && dataStructure[form.database][form.model]) {
      setIndexes(dataStructure[form.database][form.model]);
    } else {
      setIndexes([]);
    }
  }, [form.model]);

  const steps = [
    'Git URL',
    'Choose Collection',
    'Choose Model',
    'Indexing Options',
    'Confirmation',
  ];

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({
      ...oldForm,
      [name]: value,
    }));
  };

  function extractRepoName(url: string): string {
    // Split the URL by '/' and get the last part
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];

    // Remove the '.git' extension if present
    const repoName = lastPart.endsWith('.git') ? lastPart.slice(0, -4) : lastPart;

    return repoName;
  }

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const repoName = extractRepoName(value);

    setForm((oldForm) => ({
      ...oldForm,
      url: value,
      database: repoName,
    }));
  };

  const handleChangeExpansionmethods = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setForm((oldForm) => ({
      ...oldForm,
      expansionMethods: {
        ...oldForm.expansionMethods,
        [name]: checked,
      },
    }));
  };

  const handleChangeCollectionAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value === 'CREATE') {
      setForm((oldForm) => ({ ...oldForm, indexingAction: 'CREATE' }));
    } else if (value === 'UPDATE') {
      setForm((oldForm) => ({ ...oldForm, indexingAction: null }));
    }

    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleReset = () => {
    setForm(emptyIndexRequest);
    setActiveStep(0);
  };

  const handleFinish = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      fetch(`${baseURL}/index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then(() => {
          refreshDataStructure();
          setLoading(false);
          setSuccess(true);
          setIsDialogOpen(false);
          setIsSnackbarVisible(true);
          handleReset();
        })
        .catch(() => {
          setLoading(false);
          setSuccess(false);
          setError(true);
        });
    }
  };

  const totalSteps = () => steps.length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (!isLastStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleFinish();
    }
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0: {
        // Did not find any solution to validate gir urls
        return false;
      }
      case 1: {
        return form.collectionAction === null || form.database === '';
      }
      case 2: {
        return form.model === '';
      }
      case 3: {
        if (form.expansionMethods === null) return true;
        return false;
      }
      case 4: {
        return false;
      }
      default: {
        return true;
      }
    }
  };

  const getSelectedExpansionMethods = () => {
    const selectedExpansionMethods: string[] = [];

    Object.entries(form.expansionMethods).map((entry) => {
      if (entry[1] as boolean) {
        selectedExpansionMethods.push(entry[0]);
      }

      return null;
    });

    return selectedExpansionMethods.join(', ').replace(/, ([^,]*)$/, ' and $1');
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const FormStep = (step: number) => {
    switch (step) {
      case 0: {
        return (
          <FormControl>
            <FormLabel sx={{ mb: 2 }}>
              Which Git repository do you wish to index?
            </FormLabel>
            <TextField
              label="Git Repository Url"
              name="url"
              variant="filled"
              fullWidth
              value={form.url}
              onChange={handleChangeUrl}
            />
          </FormControl>
        );
      }
      case 1: {
        return (
          <>
            <FormControl>
              <FormLabel sx={{ mb: 2 }}>
                Would you like to create a new collection or update an existing one?
              </FormLabel>
              <RadioGroup
                row
                name="collectionAction"
                value={form.collectionAction}
                onChange={handleChangeCollectionAction}
              >
                <FormControlLabel
                  value="CREATE"
                  control={<Radio />}
                  label="Create new collection"
                />
                <FormControlLabel
                  value="UPDATE"
                  control={<Radio />}
                  label="Update existing collection"
                />
              </RadioGroup>
            </FormControl>

            {form.collectionAction === 'CREATE' && (
            <TextField
              label="Name"
              name="database"
              variant="filled"
              fullWidth
              value={form.database}
              onChange={handleChange}
              helperText="Name of new collection"
            />
            )}

            {form.collectionAction === 'UPDATE' && (
            <TextField
              label="Collection"
              name="database"
              value={form.database}
              onChange={handleChange}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option disabled value="" />
              {databases.map((db) => <option key={db} value={db}>{db}</option>)}
            </TextField>
            )}

          </>
        );
      }
      case 2: {
        return (
          <>
            {form.collectionAction === 'UPDATE' && (
              <FormControl>
                <FormLabel sx={{ mb: 2 }}>
                  Would you like to create a new index or update an existing one?
                </FormLabel>
                <RadioGroup
                  row
                  name="indexingAction"
                  value={form.indexingAction}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="CREATE"
                    control={<Radio />}
                    label="Create new index"
                  />
                  <FormControlLabel
                    value="UPDATE"
                    control={<Radio />}
                    label="Update existing index"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {form.indexingAction && (
            <FormControl>
              <FormLabel sx={{ mb: 2 }}>
                Which kind of index would you like to create?
              </FormLabel>
              <RadioGroup
                row
                name="model"
                value={form.model}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={BM25_NAME}
                  control={<Radio />}
                  label="BM25"
                />
                <FormControlLabel
                  disabled
                  value={COLBERT_NAME}
                  control={<Radio />}
                  label="ColBERT"
                />
              </RadioGroup>
            </FormControl>
            )}

            {form.indexingAction === 'CREATE' && (
            <>
              <TextField
                label="Name"
                name="index"
                variant="filled"
                fullWidth
                value={form.index}
                onChange={handleChange}
                helperText="Name of new index"
                disabled={form.model === null}
              />
            </>
            )}

            {form.indexingAction === 'UPDATE' && (
            <TextField
              label="Index"
              name="index"
              value={form.index}
              onChange={handleChange}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option disabled value="" />
              {indexes.map(
                (index) => <option key={index} value={index}>{index}</option>,
              )}
            </TextField>
            )}
          </>
        );
      }
      case 3: {
        return (
          <>
            <FormControl>
              <FormLabel sx={{ mb: 2 }}>
                How would you like to expand your documents?
              </FormLabel>
              <FormGroup
                onChange={handleChangeExpansionmethods}
              >
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={form.expansionMethods[CODETRANS_NAME]}
                      onChange={handleChange}
                      name={CODETRANS_NAME}
                    />
                )}
                  label="CodeTrans"
                />

                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={form.expansionMethods[PLBART_NAME]}
                      onChange={handleChange}
                      name={PLBART_NAME}
                    />
                )}
                  label="PLBART"
                />

                <FormControlLabel
                  disabled
                  control={(
                    <Checkbox
                      checked={form.expansionMethods[KEYWORDS_NAME]}
                      onChange={handleChange}
                      name={KEYWORDS_NAME}
                    />
                )}
                  label="Keywords"
                />

              </FormGroup>
            </FormControl>

            {
            form.model === COLBERT_NAME && (
            <FormControl>
              <FormLabel>
                How would you like to index this?
              </FormLabel>
              <RadioGroup
                row
                name="neuralIndexingMethod"
                value={form.neuralIndexingMethod}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="APPLIED"
                  control={<Radio />}
                  label="Applied"
                />
                <FormControlLabel
                  value="TRAINED"
                  control={<Radio />}
                  label="Trained"
                />
              </RadioGroup>
            </FormControl>
            )
          }
          </>
        );
      }
      case 4: {
        return (
          <>
            {error && <Alert severity="error">Something went wrong. Documents could not be indexed.</Alert>}
            <Typography variant="h5">
              Indexing Summary:
            </Typography>

            <Typography variant="h6">
              Source:
            </Typography>
            <div>
              <b>Git URL: </b>
              <span>{form.url}</span>
            </div>

            <Divider />

            <Typography variant="h6">
              Collection:
            </Typography>
            <div>
              <b>Action: </b>
              <span>{form.collectionAction}</span>
            </div>
            <div>
              <b>Name: </b>
              <span>{form.database}</span>
            </div>

            <Divider />

            <Typography variant="h6">
              Index:
            </Typography>
            <div>
              <b>Action: </b>
              <span>{form.indexingAction}</span>
            </div>
            <div>
              <b>Model: </b>
              <span>{form.model}</span>
            </div>
            <div>
              <b>Name: </b>
              <span>{form.index}</span>
            </div>

            <Divider />

            <Typography variant="h6">
              Document Expansion:
            </Typography>
            <div>
              <b>Methods: </b>
              <span>{getSelectedExpansionMethods()}</span>
            </div>

          </>
        );
      }
      default: {
        throw new Error('invalid step');
      }
    }
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
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            width: '50%',
            minHeight: 480,
          },
        }}
      >
        <DialogTitle>Add Code Base</DialogTitle>

        <DialogContent>
          <Stack component="form" spacing={2}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {FormStep(activeStep)}
          </Stack>
        </DialogContent>
        <DialogActions>
          {activeStep === steps.length ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : (
            <>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleFinish}
                  >
                    Submit
                  </Button>
                  {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                  )}
                </Box>
              ) : (
                <Button onClick={handleNext} disabled={isNextDisabled()}>
                  Next
                </Button>
              )}
            </>
          )}
        </DialogActions>

      </Dialog>

      <Snackbar open={isSnackbarVisible} autoHideDuration={600} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Documents successfully indexed
        </Alert>
      </Snackbar>
    </>
  );
}
