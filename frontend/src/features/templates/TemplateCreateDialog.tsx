import * as React from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Others
import { green } from '@mui/material/colors';
import { useRecoilValue } from 'recoil';
import { useAddTemplateMutation, Template, emptyTemplate } from '../../app/services/templates';
import { SearchMode } from '../search/searchSlice';
import { setSnackbarText, toggleSnackbar } from '../snackbar/snackbarSlice';
import { useAppDispatch } from '../../app/hooks';
import Markdown from '../Markdown';
import { dbsState, filteredModelsState, languagesState } from '../../recoil/selectors';

interface TemplateCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function TemplateCreateDialog(props: TemplateCreateDialogProps) {
  const dispatch = useAppDispatch();
  const { open, onClose } = props;

  // State
  const languages = useRecoilValue(languagesState);
  const models = useRecoilValue(filteredModelsState);
  const dbs = useRecoilValue(dbsState);
  const [form, setForm] = React.useState<Template>(emptyTemplate);

  const isDisabled = (name: string) => name !== form.mode;
  const [addTemplate, {
    isLoading, isSuccess,
  }] = useAddTemplateMutation();

  // Style
  const buttonSx = {
    ...(isSuccess && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  // Handlers
  const handleTextFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const newForm = {
      ...form,
      [field]: (event.target as HTMLInputElement).value as SearchMode,
    };
    setForm(newForm);
  };

  const handleSelectFormFieldChange = (event: SelectChangeEvent, field: string) => {
    const newForm = {
      ...form,
      [field]: event.target.value as string,
    };
    setForm(newForm);
  };

  const handleCreateTemplate = async () => {
    const newTemplate = { ...emptyTemplate };

    switch (form.mode) {
      case 'default':
        newTemplate.mode = form.mode;
        newTemplate.text = form.text;
        break;
      case 'separated':
        newTemplate.mode = form.mode;
        newTemplate.code = form.code;
        newTemplate.equation = form.equation;
        break;
      case 'url':
        newTemplate.mode = form.mode;
        newTemplate.url = form.url;
        break;
      default:
        newTemplate.mode = form.mode;
        newTemplate.text = form.text;
        break;
    }

    newTemplate.name = form.name;
    newTemplate.language = form.language;
    newTemplate.model = form.model;
    newTemplate.database = form.database;

    try {
      await addTemplate(newTemplate).unwrap();
      setForm(emptyTemplate);
      onClose();
      dispatch(setSnackbarText('✅ Template created successfully.'));
      dispatch(toggleSnackbar(true));
    } catch (e) {
      dispatch(setSnackbarText('😢 Something went wront. Your template could not be created.'));
      dispatch(toggleSnackbar(true));
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Create Template</DialogTitle>
      <DialogContent>

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFormFieldChange(e, 'name')}
              id="name-input"
              label="Name"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                labelId="model-select-label"
                id="model-select"
                value={form.model}
                onChange={(e: SelectChangeEvent) => handleSelectFormFieldChange(e, 'model')}
              >
                {models?.map((mod) => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="modelLanguage-select-label">Model language</InputLabel>
              <Select
                labelId="modelLanguage-select-label"
                id="modelLanguage-select"
                value={form.language}
                onChange={(e: SelectChangeEvent) => handleSelectFormFieldChange(e, 'language')}
              >
                {languages?.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="database-select-label">Database</InputLabel>
              <Select
                labelId="database-select-label"
                id="database-select"
                value={form.database}
                onChange={(e: SelectChangeEvent) => handleSelectFormFieldChange(e, 'database')}
              >
                {dbs.map((db) => <MenuItem key={db} value={db}>{db}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Search mode...</FormLabel>
              <RadioGroup
                row
                defaultValue="default"
                onChange={(e) => handleSelectFormFieldChange(e, 'mode')}
                aria-label="search mode"
                name="search-mode-radio-buttons-group"
              >
                <FormControlLabel value="default" control={<Radio />} label="Default" />
                <FormControlLabel value="separated" control={<Radio />} label="Separated" />
                <FormControlLabel value="url" control={<Radio />} label="URL" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFormFieldChange(e, 'text')}
              disabled={isDisabled('default')}
              id="default-search-input"
              label="Default Search"
              variant="filled"
              fullWidth
              helperText="This field supports markdown."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFormFieldChange(e, 'code')}
              disabled={isDisabled('separated')}
              id="code-search-input"
              label="Code"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFormFieldChange(e, 'equation')}
              disabled={isDisabled('separated')}
              id="equation-search-input"
              label="Equation"
              variant="filled"
              fullWidth
              helperText="This field supports markdown."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFormFieldChange(e, 'url')}
              disabled={isDisabled('url')}
              id="id-search-input"
              label="ID or URL"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Equation Preview
                </Typography>
                <Typography variant="h5" component="div">
                  <Markdown text={form.text} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose()}>
          Cancel
        </Button>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={isLoading}
            onClick={handleCreateTemplate}
          >
            Create
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'success',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
