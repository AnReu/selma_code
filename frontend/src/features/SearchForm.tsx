/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TuneIcon from '@mui/icons-material/Tune';
import { useRecoilState, useRecoilValue } from 'recoil';
import SearchIcon from '@mui/icons-material/Search';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdvancedSearchDialog from './navbar/AdvancedSearchDialog';
import { QueryErrors, queryState } from '../recoil/atoms';
import { dataStructureQueryState } from '../recoil/selectors';

export default function SearchForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useRecoilState(queryState);
  const dataStructure = useRecoilValue(dataStructureQueryState);
  const [models, setModels] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [queryErrors, setQueryErrors] = React.useState<QueryErrors>({});

  React.useEffect(() => {
    // filter models
    if (query.database && dataStructure[query.database]) {
      setModels(Object.keys(dataStructure[query.database]));
    } else {
      setModels([]);
    }
  }, [query]);

  const validate = () => {
    const errors: QueryErrors = {};
    if (query.mode === 'default' && query.text === '') {
      errors.text = 'Text is required in default search mode';
    }
    if (query.database === '') {
      errors.database = 'Database is required';
    }
    if (query.model === '') {
      errors.model = 'Model is required';
    }
    // TODO: implement logic to determine wheter index is required
    const isIndexRequired = true;
    if (query.index === '' && isIndexRequired) {
      errors.index = 'This model requires an index';
    }
    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const errors = validate();
    setQueryErrors(errors);

    // If there is no error, then form can be submitted
    if (Object.keys(errors).length === 0) {
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
    }
  };

  return (
    <Stack
      onSubmit={handleSubmit}
      direction="row"
      component="form"
      role="search"
      justifyContent="center"
    >
      <TextField
        select
        value={query.model}
        onChange={handleChange}
        label="Model"
        name="model"
        SelectProps={{
          native: true,
        }}
        sx={{
          flexGrow: 1,
          minWidth: '192px',
          fieldset: {
            borderRadius: '4px 0 0 4px',
          },
        }}
      >
        <option value="" />
        {models.map((model) => <option value={model} key={model}>{model}</option>)}
      </TextField>
      <TextField
        label="Query"
        name="text"
        value={query.text}
        onChange={handleChange}
        sx={{
          flexGrow: 5,
          '.MuiInputBase-root': {
            paddingRight: '8px',
          },
          fieldset: {
            borderRadius: '0 4px 4px 0',
            marginLeft: '-1px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setIsDialogOpen(true)}
                aria-label="advanced search"
                size="large"
              >
                <TuneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <AdvancedSearchDialog
        errors={queryErrors}
        dataStructure={dataStructure}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Stack>
  );
}
