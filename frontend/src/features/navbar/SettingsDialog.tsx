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
import { queryState } from '../../recoil/atoms';
import {
  Config,
  dataStructureQueryState,
  dbsState,
  filteredModelsState,
  filteredIndexesState,
  languagesState,
  configsState,
  useConfigsMutations,
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
  const [query, setQuery] = useRecoilState(queryState);
  const [configs, setConfigs] = useRecoilState(configsState);
  const [configsForm, setConfigsForm] = React.useState<Config>(configs);
  const { updateConfigs } = useConfigsMutations();
  const [isIndexSelectDisabled, setIsIndexSelectDisabled] = React.useState(true);

  React.useEffect(() => {
    const { database, model } = query;
    setIsIndexSelectDisabled(!!dataStructure[database] && !!dataStructure[database][model]);
  }, [dataStructure]);

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
    setQuery({ ...query, [name]: value });
  };

  const handleUpdateConfig = async () => {
    updateConfigs(configsForm);
    setConfigs(configsForm);
    onClose();
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
            name="database"
            value={query.database}
            onChange={handleChange}
            defaultValue={query.database}
            select
          >
            {dbs.map((database) => <MenuItem key={database} value={database}>{database}</MenuItem>)}
          </TextField>

          <TextField
            label="Model"
            name="model"
            value={query.model}
            onChange={handleChange}
            defaultValue={query.model}
            disabled={query.database === ''}
            select
          >
            {models.map((model) => <MenuItem key={model} value={model}>{model}</MenuItem>)}
          </TextField>

          <TextField
            label="Index"
            name="index"
            value={query.index}
            onChange={handleChange}
            defaultValue={query.index}
            disabled={isIndexSelectDisabled}
            select
          >
            {indexes.map((index) => <MenuItem key={index} value={index}>{index}</MenuItem>)}
          </TextField>

          <TextField
            label="language"
            name="language"
            value={query.language}
            onChange={handleChange}
            defaultValue={query.language}
            disabled
            select
          >
            {languages.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
          </TextField>

          <TextField
            onChange={handleTextChange}
            label="DATABASE_PATH"
            variant="filled"
            name="db_path"
            value={configsForm.db_path}
          />

          <TextField
            onChange={handleTextChange}
            label="DB_TABLE_NAME"
            variant="filled"
            name="db_table_name"
            value={configsForm.db_table_name}
          />

          <TextField
            onChange={handleTextChange}
            label="DB_CONTENT_ATTRIBUTE_NAME"
            variant="filled"
            name="db_content_attribute_name"
            value={configsForm.db_content_attribute_name}
          />

          <TextField
            onChange={handleTextChange}
            label="INDEX_PATH"
            variant="filled"
            name="index_path"
            value={configsForm.index_path}
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
                  checked={false}
                  name="separated"
                  disabled
                />
              )}
              label="Separated"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={false}
                  name="url"
                  disabled
                />
              )}
              label="ID/URL"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={false}
                  name="file"
                  disabled
                />
              )}
              label="File"
            />
          </FormGroup>

          <Button onClick={handleUpdateConfig}>Apply</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
