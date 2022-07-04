/* eslint-disable max-len */
import React, { FormEvent } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// MUI Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
// Others
import Hotkeys from 'react-hot-keys';
import { useRecoilState } from 'recoil';
import { createSearchParams, useNavigate } from 'react-router-dom';
import CreateTemplateDialog from '../templates/TemplateCreateDialog';
import { queryState } from '../../recoil/atoms';

export default function DefaultSearchBar() {
  const navigate = useNavigate();
  const inputDefaultSearchEl = React.useRef<HTMLInputElement>(null);
  // State
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useRecoilState(queryState);

  // Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, text: event.target.value });
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

  const onKeyCombo = (shortcut: string, event: KeyboardEvent) => {
    event.preventDefault();
    inputDefaultSearchEl.current?.focus();
  };

  return (
    <>
      <Hotkeys
        keyName="command+k,ctrl+k"
        onKeyDown={onKeyCombo}
      >

        <Stack>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 800,
              borderRadius: '30px',
              m: 'auto',
            }}
          >

            <InputBase
              inputRef={inputDefaultSearchEl}
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={query.text}
              onChange={handleChange}
            />

            <IconButton
              sx={{ p: '10px' }}
              aria-label="Open template dialog"
              onClick={() => setOpen(true)}
            >
              <AddCircleIcon />
            </IconButton>

            <Divider
              sx={{ height: 28, m: 0.5 }}
              orientation="vertical"
            />

            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="Open search settings"
            >
              <TuneIcon />
            </IconButton>

            <Divider
              sx={{ height: 28, m: 0.5 }}
              orientation="vertical"
            />

            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="Run search"
            >
              <SearchIcon />
            </IconButton>

          </Paper>

          <Box sx={{ width: 800, textAlign: 'center' }}>
            <Typography color="textPrimary" variant="caption">
              This is a Markdown text field. For code use ``` as delimiter, like ```my code here```. For Equations use $ as delimiter.
            </Typography>
          </Box>
        </Stack>
        <CreateTemplateDialog
          open={open}
          onClose={() => setOpen(false)}
        />
      </Hotkeys>
    </>
  );
}
