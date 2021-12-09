import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Tooltip from '@mui/material/Tooltip';
import TemplateCreateDialog from '../templates/TemplateCreateDialog';

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { onSearch } = props;

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = React.useState(false);
  const [defaultSearchText, setDefaultSearchText] = React.useState('');

  const handleSearch = () => {
    onSearch(defaultSearchText);
  };

  const handleDefaultSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultSearchText(event.target.value as string);
  };

  return (
    <>
      <Grid container justifyContent="center" alignContent="center" sx={{ minHeight: 300, backgroundColor: (theme) => theme.palette.background.default }}>
        <Grid item>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              borderRadius: '30px',
            }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={defaultSearchText}
              onChange={handleDefaultSearchTextChange}
            />
            <Tooltip title="Advanced search">
              <IconButton sx={{ p: '10px' }} aria-label="open advanced search" onClick={() => setIsAdvancedSearchOpen(true)}>
                <TuneIcon />
              </IconButton>
            </Tooltip>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <Tooltip title="Create query template">
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="create query template">
                <AddCircleIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Run search">
              <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="run search">
                <SearchIcon />
              </IconButton>
            </Tooltip>

          </Paper>
        </Grid>
      </Grid>
      <TemplateCreateDialog
        open={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
      />
    </>
  );
}
