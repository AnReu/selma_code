/* eslint-disable max-len */
import React from 'react';
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
// Others
import Hotkeys from 'react-hot-keys';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import CreateTemplateDialog from '../templates/TemplateCreateDialog';
import { queryState } from '../../recoil/atoms';
import { queryStringState } from '../../recoil/selectors';

export default function DefaultSearchBar() {
  const inputDefaultSearchEl = React.useRef<HTMLInputElement>(null);
  // State
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useRecoilState(queryState);
  const queryString = useRecoilValue(queryStringState);

  // Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, text: event.target.value });
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
              aria-label="open advanced search"
              onClick={() => setOpen(true)}
            >
              <AddCircleIcon />
            </IconButton>

            <Divider
              sx={{ height: 28, m: 0.5 }}
              orientation="vertical"
            />

            <Link to={{
              pathname: 'results',
              search: queryString,
            }}
            >
              <IconButton
                type="submit"
                sx={{ p: '10px' }}
                aria-label="run search"
              >
                <SearchIcon />
              </IconButton>
            </Link>

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
