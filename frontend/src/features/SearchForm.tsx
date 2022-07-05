/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TuneIcon from '@mui/icons-material/Tune';
import { useRecoilState, useRecoilValue } from 'recoil';
import SearchIcon from '@mui/icons-material/Search';
import { createSearchParams, useNavigate } from 'react-router-dom';
import CustomSelect from './CustomSelect';
import CustomTextField from './CustomTextField';
import AdvancedSearchDialog from './navbar/AdvancedSearchDialog';
import { queryState } from '../recoil/atoms';
import { dataStructureQueryState } from '../recoil/selectors';

export default function SearchForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useRecoilState(queryState);
  const dataStructure = useRecoilValue(dataStructureQueryState);
  const [models, setModels] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    // filter models
    if (query.database && dataStructure[query.database]) {
      setModels(Object.keys(dataStructure[query.database]));
    } else {
      setModels([]);
    }
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate({
      pathname: 'results',
      search: createSearchParams({
        text: query.text!, // TODO: review non-null assertion operator (aka !)
        database: query.database,
        model: query.model,
        index: query.index,
        language: query.language,
        page: '1',
      }).toString(),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      role="search"
      sx={{
        display: 'flex',
        minWidth: '240px',
        flexGrow: 1,
      }}
    >
      <CustomSelect
        label="Model"
        value={query.model}
        name="model"
        onChange={handleChange}
      >
        <option value="" />
        {models.map((model) => <option key={model} value={model}>{model}</option>)}
      </CustomSelect>

      <CustomTextField
        label="Query"
        value={query.text!} // TODO: review non-null assertion operator (aka !)
        name="text"
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
            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="Run search"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )}
      />
      <AdvancedSearchDialog
        dataStructure={dataStructure}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Box>
  );
}
