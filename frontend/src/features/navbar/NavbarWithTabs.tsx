import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import FormControl from '@mui/material/FormControl';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import TemplateListDialog from '../templates/TemplateListDialog';
import DefaultSearchBar from '../search/DefaultSearchBar';
import SeparatedSearchBar from '../search/SeparatedSearchBar';
import URLSearchBar from '../search/URLSearchBar';
import FileUploadSearchBar from '../search/FileUploadSearchBar';
import { useGetDatabasesQuery } from '../../app/services/databases';
import { useGetLanguagesQuery } from '../../app/services/languages';
import { useGetModelsQuery } from '../../app/services/models';
import {
  selectModel,
  selectLanguage,
  setModel,
  setLanguage,
  selectMode,
  setMode,
  SearchMode,
  setDb,
  selectDb,
} from '../search/searchSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { emptyConfig, useGetConfigsQuery } from '../../app/services/configs';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  currentMode: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, currentMode, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== currentMode}
      id={`tabpanel-${currentMode}`}
      aria-labelledby={`tab-${currentMode}`}
      {...other}
    >
      {value === currentMode && (
        <Box sx={{
          display: 'flex',
          minHeight: (theme) => theme.spacing(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function NavbarWithTabs() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { data: models = [] } = useGetModelsQuery();
  const { data: dbs = [] } = useGetDatabasesQuery();
  const { data: config = emptyConfig } = useGetConfigsQuery();
  const model = useAppSelector(selectModel);
  const db = useAppSelector(selectDb);
  const language = useAppSelector(selectLanguage);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const mode = useAppSelector(selectMode);

  const isMenuOpen = Boolean(anchorEl);

  const handleChangeModel = (event: SelectChangeEvent) => {
    dispatch(setModel(event.target.value as string));
  };

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    dispatch(setLanguage(event.target.value as string));
  };

  const handleChangeDb = (event: SelectChangeEvent) => {
    dispatch(setDb(event.target.value as string));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(setMode(newValue as SearchMode));
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/settings">Settings</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            RetrievalSystem
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <TemplateListDialog />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <FormControl sx={{ mx: 2, minWidth: 200 }} variant="filled">
              <InputLabel id="model-select-label">Database</InputLabel>
              <Select
                size="small"
                autoWidth
                labelId="db-select-label"
                id="db-select"
                value={db}
                onChange={handleChangeDb}
              >
                {dbs?.map((_db) => <MenuItem key={_db} value={_db}>{_db}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl sx={{ mx: 2, minWidth: 200 }} variant="filled">
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                size="small"
                autoWidth
                labelId="model-select-label"
                id="model-select"
                value={model}
                onChange={handleChangeModel}
              >
                {models?.map((mod) => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={{ mx: 2, minWidth: 200 }} variant="filled">
              <InputLabel id="modelLanguage-select-label">Model language</InputLabel>
              <Select
                size="small"
                autoWidth
                labelId="modelLanguage-select-label"
                id="modelLanguage-select"
                value={language}
                onChange={handleChangeLanguage}
              >
                {languages?.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
              </Select>
            </FormControl>

            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>

        </Toolbar>
        <Tabs
          value={mode}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab disabled={!config.allowed_search_modes.default} value="default" label="Default" {...a11yProps(0)} />
          <Tab disabled={!config.allowed_search_modes.separated} value="separated" label="Separated" {...a11yProps(1)} />
          <Tab disabled={!config.allowed_search_modes.url} value="url" label="ID or URL" {...a11yProps(2)} />
          <Tab disabled={!config.allowed_search_modes.file} value="file" label="File" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value="default" currentMode={mode} dir={theme.direction}>
        <DefaultSearchBar />
      </TabPanel>
      <TabPanel value="separated" currentMode={mode} dir={theme.direction}>
        <SeparatedSearchBar />
      </TabPanel>
      <TabPanel value="url" currentMode={mode} dir={theme.direction}>
        <URLSearchBar />
      </TabPanel>
      <TabPanel value="file" currentMode={mode} dir={theme.direction}>
        <FileUploadSearchBar />
      </TabPanel>

      {renderMenu}
    </Box>
  );
}