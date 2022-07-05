import React from 'react';
import Button from '@mui/material/Button';
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
  languagesState,
  configsState,
  useConfigsMutations,
} from '../../recoil/selectors';

export interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedSearchDialog(props: SimpleDialogProps) {
  const { onClose, isOpen } = props;
  const languages = useRecoilValue(languagesState);
  const [query, setQuery] = useRecoilState(queryState);
  const [configs, setConfigs] = useRecoilState(configsState);
  const [configsForm, setConfigsForm] = React.useState<Config>(configs);
  const { updateConfigs } = useConfigsMutations();

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
            label="language"
            name="language"
            value={query.language}
            onChange={handleChange}
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

          <Button onClick={handleUpdateConfig}>Apply</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
