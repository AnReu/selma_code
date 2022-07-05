/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRecoilState, useRecoilValue } from 'recoil';
import { queryState } from '../../recoil/atoms';
import {
  Config,
  languagesState,
  configsState,
  useConfigsMutations,
  dbsState,
} from '../../recoil/selectors';

export interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dataStructure: any;
}

export default function AdvancedSearchDialog(props: SimpleDialogProps) {
  const {
    onClose, isOpen, dataStructure,
  } = props;
  const languages = useRecoilValue(languagesState);
  const [configs, setConfigs] = useRecoilState(configsState);
  const [configsForm, setConfigsForm] = React.useState<Config>(configs);
  const { updateConfigs } = useConfigsMutations();
  const [indexes, setIndexes] = React.useState<string[]>([]);
  const [models, setModels] = React.useState<string[]>([]);
  const [query, setQuery] = useRecoilState(queryState);
  const databases = useRecoilValue(dbsState);

  React.useEffect(() => {
    // filter models
    if (query.database && dataStructure[query.database]) {
      setModels(Object.keys(dataStructure[query.database]));
    } else {
      setModels([]);
    }
    // filter indexes
    if (dataStructure[query.database] && dataStructure[query.database][query.model]) {
      setIndexes(dataStructure[query.database][query.model]);
    } else {
      setIndexes([]);
    }
  }, [query]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConfigsForm((values: Config) => ({ ...values, [name]: value }));
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
        Advanced Search Settings
      </DialogTitle>
      <DialogContent>

        <Stack sx={{ pt: 2 }} spacing={2}>
          <TextField
            label="Database"
            name="database"
            value={query.database}
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            {databases.map((db) => <option key={db} value={db}>{db}</option>)}
          </TextField>
          <TextField
            label="Model"
            name="model"
            value={query.model}
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            {models.map((model) => <option key={model} value={model}>{model}</option>)}
          </TextField>
          <TextField
            label="Index"
            name="index"
            value={query.index}
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            {indexes.map((idx) => <option key={idx} value={idx}>{idx}</option>)}
          </TextField>
          <TextField
            label="Language"
            name="language"
            value={query.language}
            onChange={handleChange}
            disabled
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
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

          <Button onClick={handleUpdateConfig}>Apply</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
