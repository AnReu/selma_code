/* eslint-disable no-shadow */
/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import {
  baseURL,
  configsState,
  dataStructureQueryState, dbsState,
} from '../../recoil/selectors';

type IndexingMode = 'CREATE'|'UPDATE';
type ExpansionMethod = | 'PLBART' | 'CODETRANS' | 'KEYWORDS' | 'NONE';
type NeuralIndexingMethod = 'APLLIED' | 'TRAINED';

export interface IndexRequest {
  url: string;
  model: string;
  database: string;
  index: string;
  expansionMethod: ExpansionMethod | null;
  neuralIndexingMethod: NeuralIndexingMethod | null;
  indexingMode: IndexingMode | null;
}

const COLBERT_NAME = 'PyterrierColbert';
const BM25_NAME = 'PyterrierModel';

export const emptyIndexRequest: IndexRequest = {
  url: 'https://github.com/jabedhasan21/java-hello-world-with-maven.git',
  model: BM25_NAME,
  database: 'new_database',
  index: '',
  expansionMethod: 'CODETRANS',
  neuralIndexingMethod: null,
  indexingMode: 'CREATE',
};

export default function SelfIndexingDialog() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [form, setForm] = React.useState<IndexRequest>(emptyIndexRequest);
  const [models, setModels] = React.useState<string[]>([]);
  const databases = useRecoilValue(dbsState);
  const dataStructure = useRecoilValue(dataStructureQueryState);
  const configs = useRecoilValue(configsState);

  const steps = [
    'Git URL',
    'Choose Collection',
    'Choose Model',
    'Indexing Options',
    'Confirmation',
  ];

  React.useEffect(() => {
    // filter models
    if (form.database && dataStructure[form.database]) {
      setModels(Object.keys(dataStructure[form.database]));
    } else {
      setModels([]);
    }
  }, [form]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleReset = () => {
    setForm(emptyIndexRequest);
    setActiveStep(0);
  };

  const handleFinish = () => {
    fetch(`${baseURL}/index`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsOpen(false);
      })
      .catch((error) => console.error(error));
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
        return form.indexingMode === null || form.database === '';
      }
      case 2: {
        return form.model === '';
      }
      case 3: {
        if (form.expansionMethod === null) return true;
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
            onChange={handleChange}
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
                name="indexingMode"
                value={form.indexingMode}
                onChange={handleChange}
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

            {form.indexingMode === 'CREATE' && (
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

            {form.indexingMode === 'UPDATE' && (
            <TextField
              label="Database"
              name="database"
              value={form.database}
              onChange={handleChange}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="" />
              {databases.map((db) => <option key={db} value={db}>{db}</option>)}
            </TextField>
            )}

          </>
        );
      }
      case 2: {
        if (form.indexingMode === 'CREATE') {
          return (
          <FormControl>
            <FormLabel sx={{ mb: 2 }}>
              Which model do you wish to use to build the index?
            </FormLabel>
          <TextField
            label="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="" disabled />
            {models.map((idx) => <option key={idx} value={idx}>{idx}</option>)}
          </TextField>
          </FormControl>
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
                onChange={handleChange}
              >
                <FormControlLabel
                  value="codetrans"
                  control={<Checkbox />}
                  label="CodeTrans"
                />
                <FormControlLabel
                  value="plbart"
                    control={<Checkbox />}
                  label="PLBART"
                />
                <FormControlLabel
                  value="keywords"
                  control={<Checkbox />}
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
            <p>{form.indexingMode === 'CREATE' ? `Create new collection: ${form.database}` : `Update collection: ${form.database}`}</p>
            <p>
              {`From git repo: ${form.url}`}
            </p>
            <p>
              {`Using the model: ${form.model}`}
            </p>
            <p>
              {`Expanding documents using: ${form.expansionMethod}`}
            </p>
            {form.model === 'PyTerrierColbert' && <p>form.neuralIndexingMethod</p>}
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
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '50%',
            height: 480,
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
              <Button onClick={handleNext} disabled={isNextDisabled()}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </>
          )}
        </DialogActions>

      </Dialog>
    </>
  );
}
