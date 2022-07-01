import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TuneIcon from '@mui/icons-material/Tune';
import { useRecoilState } from 'recoil';
import CustomSelect from './CustomSelect';
import CustomTextField from './CustomTextField';
import AdvancedSearchDialog from './navbar/AdvancedSearchDialog';
import { queryState } from '../recoil/atoms';

export default function SearchForm() {
  const [query, setQuery] = useRecoilState(queryState);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuery({ ...query, [name]: value });
  };

  return (
    <Box
      component="form"
      role="search"
      sx={{
        display: 'flex',
        minWidth: '240px',
        flexGrow: 1,
      }}
    >
      <CustomSelect
        label="Database"
        value={query.db}
        name="db"
        onChange={handleChange}
      >
        <option disabled value="">None</option>
        <option value="codeSearchNet">codeSearchNet</option>
        <option value="postdb">postdb</option>
      </CustomSelect>
      <CustomSelect
        label="Model"
        value={query.model}
        name="model"
        onChange={handleChange}
      >
        <option disabled value="">None</option>
        <option value="codeSearchNet">PyterrierModel</option>
        <option value="postdb">VectorModel</option>
      </CustomSelect>
      <CustomSelect
        label="Index"
        value={query.index}
        name="index"
        onChange={handleChange}
      >
        <option disabled value="">None</option>
        <option value="default">Default</option>
        <option value="code">Code</option>
      </CustomSelect>
      <CustomTextField
        label="Query"
        value={query.text}
        onChange={handleChange}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              onClick={() => setIsDialogOpen(true)}
              sx={{ p: '10px' }}
              aria-label="Open search settings"
            >
              <TuneIcon />
            </IconButton>
          </InputAdornment>
        )}
      />
      <AdvancedSearchDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box>
  );
}
