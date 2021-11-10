/* eslint-disable max-len */
import React from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// MUI Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
// Others
import Hotkeys from 'react-hot-keys';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CreateTemplateDialog from '../templates/TemplateCreateDialog';
import {
  setText, setMode, setParams, selectText,
} from './searchSlice';

export default function DefaultSearchBar() {
  const inputDefaultSearchEl = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  // State
  const query = useAppSelector(selectText);
  const [open, setOpen] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(true);

  // Handlers
  const handleQueryTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    dispatch(setText((event.target as HTMLInputElement).value));
  };

  const handleSearch = () => {
    dispatch(setText(query));
    dispatch(setMode('default'));
    dispatch(setParams());
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const onKeyCombo = () => {
    inputDefaultSearchEl.current?.focus();
  };

  return (
    <>
      <Hotkeys
        keyName="command+k,ctrl+k"
        onKeyDown={onKeyCombo}
      >

        <Stack>
          <Tooltip
            open={showTooltip}
            placement="top-start"
            title="Try ⌘+K"
          >
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
                value={query}
                onChange={handleQueryTextChange}
                onKeyDown={handleEnter}
                onFocus={() => setShowTooltip(false)}
              />
              <Tooltip title="Create query template">
                <IconButton sx={{ p: '10px' }} aria-label="open advanced search" onClick={() => setOpen(true)}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <Tooltip title="Run search">
                <IconButton sx={{ p: '10px' }} onClick={handleSearch} aria-label="run search">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Tooltip>

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
