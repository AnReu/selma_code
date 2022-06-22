import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRecoilState, useRecoilValue } from 'recoil';
import { queryParametersState } from '../../recoil/atoms';
import {
  Config,
  dataStructureQueryState,
  dbsState,
  emptyConfig,
  filteredModelsState,
  filteredIndexesState,
  languagesState,
} from '../../recoil/selectors';

export interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog(props: SimpleDialogProps) {
  const { onClose, isOpen } = props;
  const languages = useRecoilValue(languagesState);
  const dbs = useRecoilValue(dbsState);
  const models = useRecoilValue(filteredModelsState);
  const indexes = useRecoilValue(filteredIndexesState);
  const dataStructure = useRecoilValue(dataStructureQueryState);
  const [queryParameters, setQueryParameters] = useRecoilState(queryParametersState);
  const [configsForm, setConfigsForm] = React.useState<Config>(emptyConfig);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConfigsForm((values: Config) => ({ ...values, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setConfigsForm((values: Config) => ({
      ...values,
      allowed_search_modes: {
        ...values.allowed_search_modes, [name]: checked,
      },
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newParameters = { ...queryParameters, [name]: value };
    setQueryParameters(newParameters);
  };

  const handleUpdateConfig = async () => {
    console.error('TODO');
    // filter empty properties
    // const nonEmptyCfg = Object.fromEntries(
    //   Object.entries(configsForm).filter(([, v]) => v !== ''),
    // );
    // await updateConfigs(nonEmptyCfg);
    onClose();
  };

  const isIndexSelectDisabled = () => {
    const { model } = queryParameters;
    if (model === '') return true;
    const { db } = queryParameters;
    return dataStructure[db][model].length === 0;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
    >
      <DialogTitle>
        Settings
      </DialogTitle>
      <DialogContent>

        <Stack sx={{ pt: 2 }} spacing={2}>
          <TextField
            label="Database"
            name="db"
            value={queryParameters.db}
            onChange={handleChange}
            defaultValue={queryParameters.db}
            select
          >
            {dbs.map((database) => <MenuItem key={database} value={database}>{database}</MenuItem>)}
          </TextField>

          <TextField
            label="Model"
            name="model"
            value={queryParameters.model}
            onChange={handleChange}
            defaultValue={queryParameters.model}
            disabled={queryParameters.db === ''}
            select
          >
            {models.map((model) => <MenuItem key={model} value={model}>{model}</MenuItem>)}
          </TextField>

          <TextField
            label="Index"
            name="index"
            value={queryParameters.index}
            onChange={handleChange}
            defaultValue={queryParameters.index}
            disabled={isIndexSelectDisabled()}
            select
          >
            {indexes.map((index) => <MenuItem key={index} value={index}>{index}</MenuItem>)}
          </TextField>

          <TextField
            label="language"
            name="language"
            value={queryParameters.language}
            onChange={handleChange}
            defaultValue={queryParameters.language}
            disabled
            select
          >
            {languages.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
          </TextField>

          <TextField
            onChange={handleTextChange}
            label="DATABASE_PATH"
            variant="filled"
            name="database_path"
            id="database_path"
            value={configsForm.db_path}
          />
          <TextField
            onChange={handleTextChange}
            label="DATABASES_DIR_PATH"
            variant="filled"
            name="databases_dir_path"
            id="databases_dir_path"
            value={configsForm.dbs_path}
          />
          <TextField
            onChange={handleTextChange}
            label="DB_TABLE_NAME"
            variant="filled"
            name="db_table_name"
            id="db_table_name"
            value={configsForm.db_table_name}
          />
          <TextField
            onChange={handleTextChange}
            label="DB_CONTENT_ATTRIBUTE_NAME"
            variant="filled"
            name="db_content_attribute_name"
            id="db_content_attribute_name"
            value={configsForm.db_content_attribute_name}
          />
          <TextField
            onChange={handleTextChange}
            label="INDEX_PATH"
            variant="filled"
            name="index_path"
            id="index_path"
            value={configsForm.index_path}
          />
          <TextField
            onChange={handleTextChange}
            label="INDEXES_DIR_PATH"
            variant="filled"
            name="indexes_dir_path"
            id="indexes_dir_path"
            value={configsForm.indexes_path}
          />

          <FormGroup row>
            <FormControlLabel
              disabled
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={configsForm.allowed_search_modes.default}
                  name="default"
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              )}
              label="Default"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={configsForm.allowed_search_modes.separated}
                  name="separated"
                />
              )}
              label="Separated"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={configsForm.allowed_search_modes.url}
                  name="url"
                />
              )}
              label="ID/URL"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={configsForm.allowed_search_modes.file}
                  name="file"
                />
              )}
              label="File"
            />
          </FormGroup>

          <Button onClick={handleUpdateConfig}>Submit</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
