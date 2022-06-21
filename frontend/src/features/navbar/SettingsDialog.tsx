import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Config,
  emptyConfig,
  useUpdateConfigsMutation,
  useGetConfigsQuery,
} from '../../app/services/configs';
import { useGetLanguagesQuery } from '../../app/services/languages';
import { useGetDatabasesQuery } from '../../app/services/databases';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setDb, setLanguage, selectDb, selectLanguage,
} from '../search/searchSlice';

export interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog(props: SimpleDialogProps) {
  const { onClose, isOpen } = props;
  const dispatch = useAppDispatch();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { data: dbs = [] } = useGetDatabasesQuery();
  const db = useAppSelector(selectDb);
  const language = useAppSelector(selectLanguage);
  const [updateConfigs, { isLoading: isUpdating }] = useUpdateConfigsMutation();

  const {
    data,
    isSuccess,
    isLoading,
    isError,
  } = useGetConfigsQuery();

  const [cfg, setCfg] = React.useState<Config>(emptyConfig);

  React.useEffect(() => {
    if (data) {
      setCfg(data);
    }
  }, [isSuccess]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCfg((values: Config) => ({ ...values, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCfg((values: Config) => ({
      ...values,
      allowed_search_modes: {
        ...values.allowed_search_modes, [name]: checked,
      },
    }));
  };

  const handleChangeDb = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDb(event.target.value as string));
  };

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLanguage(event.target.value as string));
  };

  const handleUpdateConfig = async () => {
    // filter empty properties
    const nonEmptyCfg = Object.fromEntries(Object.entries(cfg).filter(([, v]) => v !== ''));
    await updateConfigs(nonEmptyCfg);
    onClose();
  };

  if (isLoading) return (<LinearProgress />);
  if (isError) {
    return (
      <Box role="contentinfo">Oops 😯 something went wrong</Box>
    );
  }
  // if isSuccess
  return (

    <Dialog
      open={isOpen}
      onClose={() => onClose()}
    >
      <DialogTitle>
        Settings
      </DialogTitle>
      <DialogContent>

        <Stack spacing={2}>
          <TextField
            label="language"
            name="language"
            value={language}
            onChange={handleChangeLanguage}
            defaultValue={language}
            select
          >
            {languages.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
          </TextField>

          <TextField
            label="Database"
            name="db"
            value={db}
            onChange={handleChangeDb}
            defaultValue={db}
            select
          >
            {dbs.map((database) => <MenuItem key={database} value={database}>{database}</MenuItem>)}
          </TextField>

          <TextField
            onChange={handleTextChange}
            label="DATABASE_PATH"
            variant="filled"
            name="database_path"
            id="database_path"
            value={cfg.db_path}
          />
          <TextField
            onChange={handleTextChange}
            label="DATABASES_DIR_PATH"
            variant="filled"
            name="databases_dir_path"
            id="databases_dir_path"
            value={cfg.dbs_path}
          />
          <TextField
            onChange={handleTextChange}
            label="DB_TABLE_NAME"
            variant="filled"
            name="db_table_name"
            id="db_table_name"
            value={cfg.db_table_name}
          />
          <TextField
            onChange={handleTextChange}
            label="DB_CONTENT_ATTRIBUTE_NAME"
            variant="filled"
            name="db_content_attribute_name"
            id="db_content_attribute_name"
            value={cfg.db_content_attribute_name}
          />
          <TextField
            onChange={handleTextChange}
            label="INDEX_PATH"
            variant="filled"
            name="index_path"
            id="index_path"
            value={cfg.index_path}
          />
          <TextField
            onChange={handleTextChange}
            label="INDEXES_DIR_PATH"
            variant="filled"
            name="indexes_dir_path"
            id="indexes_dir_path"
            value={cfg.indexes_path}
          />

          <FormGroup row>
            <FormControlLabel
              disabled
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={cfg.allowed_search_modes.default}
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
                  checked={cfg.allowed_search_modes.separated}
                  name="separated"
                />
              )}
              label="Separated"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={cfg.allowed_search_modes.url}
                  name="url"
                />
              )}
              label="ID/URL"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={cfg.allowed_search_modes.file}
                  name="file"
                />
              )}
              label="File"
            />
          </FormGroup>

          <Button onClick={handleUpdateConfig}>Submit</Button>
          {isUpdating && <LinearProgress />}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
