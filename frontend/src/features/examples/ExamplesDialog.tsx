/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRecoilValue } from 'recoil';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {
  dataStructureQueryState,
  dbsState, emptyExample, Example, useExamplesMutations,
} from '../../recoil/selectors';
import ExamplesList from './ExamplesList';

interface ExamplesDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

function ExamplesCreateDialog(props: ExamplesDialogProps) {
  const { isOpen, onClose: handleClose } = props;
  const [form, setForm] = React.useState<Example>(emptyExample);
  const { createExample } = useExamplesMutations();
  const dbs = useRecoilValue(dbsState);
  const dataStructure = useRecoilValue(dataStructureQueryState);
  const [models, setModels] = React.useState<string[]>([]);
  const [indexes, setIndexes] = React.useState<string[]>([]);

  React.useEffect(() => {
    // filter models
    if (form.database && dataStructure[form.database]) {
      setModels(Object.keys(dataStructure[form.database]));
    } else {
      setModels([]);
    }

    // filter indexes
    if (dataStructure[form.database] && dataStructure[form.database][form.model]) {
      setIndexes(dataStructure[form.database][form.model]);
    } else {
      setIndexes([]);
    }
  }, [form]);

  const handleCreate = () => {
    const example: Example = {
      name: form.name,
      text: form.text, // TODO: choose text or code & equation or url according to mode
      database: form.database,
      model: form.model,
      index: form.index,
      language: form.language,
      mode: form.mode,
    };
    createExample(example);
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Create Example</DialogTitle>

      <DialogContent>
        <Stack component="form" spacing={2}>
          <TextField
            label="Name"
            name="name"
            variant="filled"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Database"
            name="database"
            variant="filled"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            value={form.database}
            onChange={handleChange}
          >
            <option value="" />
            {dbs.map((db) => <option key={db} value={db}>{db}</option>)}
          </TextField>

          <TextField
            label="Model"
            name="model"
            variant="filled"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            value={form.model}
            onChange={handleChange}
          >
            <option value="" />
            {models.map((model) => <option key={model} value={model}>{model}</option>)}
          </TextField>

          <TextField
            label="Indexes"
            name="index"
            variant="filled"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            value={form.index}
            onChange={handleChange}
          >
            <option value="" />
            {indexes.map((idx) => <option key={idx} value={idx}>{idx}</option>)}
          </TextField>

          <FormControl component="fieldset">
            <FormLabel component="legend">Search mode:</FormLabel>
            <RadioGroup
              row
              defaultValue="default"
              onChange={handleChange}
              aria-label="search mode"
              name="mode"
              sx={{ justifyContent: 'space-evenly' }}
            >
              <FormControlLabel value="default" control={<Radio />} label="Default" />
              <FormControlLabel value="separated" control={<Radio />} label="Separated" />
              <FormControlLabel value="url" control={<Radio />} label="URL" />
            </RadioGroup>
          </FormControl>

          {form.mode === 'default'
            && (
              <TextField
                label="Text"
                name="text"
                variant="filled"
                fullWidth
                value={form.text}
                onChange={handleChange}
              />
            )}

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>

    </Dialog>
  );
}

function ExamplesListDialog(props: ExamplesDialogProps) {
  const { isOpen, onClose: handleClose } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Query Examples</DialogTitle>
      <DialogContent>
        <ExamplesList onClose={handleClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ExamplesDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentDialog, setCurrentDialog] = React.useState<'list' | 'create' | undefined>(undefined);

  const handleOpenListDialog = () => {
    setCurrentDialog('list');
    setIsOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setCurrentDialog('create');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ButtonGroup
        sx={{ mr: 2 }}
        variant="outlined"

      >
        <Button
          name="list"
          onClick={handleOpenListDialog}
        >
          Examples
        </Button>
        <Button
          name="create"
          size="small"
          onClick={handleOpenCreateDialog}
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
      {
        currentDialog === 'create' && <ExamplesCreateDialog isOpen={isOpen} onClose={handleClose} />
      }
      {
        currentDialog === 'list' && <ExamplesListDialog isOpen={isOpen} onClose={handleClose} />
      }
    </>
  );
}
