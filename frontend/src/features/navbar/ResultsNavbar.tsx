import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Tabs from '@mui/material/Tabs/Tabs';
import Tab from '@mui/material/Tab/Tab';
import Button from '@mui/material/Button/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import useScrollTrigger from '@mui/material/useScrollTrigger/useScrollTrigger';
import Slide from '@mui/material/Slide/Slide';
import Box from '@mui/material/Box/Box';
import { useRecoilState, useRecoilValue } from 'recoil';
import NavbarSearchInput from './NavbarSearchInput';
import { ThemeSwitch } from '../../ThemeSwitch';
import { ColorModeContext } from '../../ColorModeContext';
import { configsState } from '../../recoil/selectors';
import { QueryMode, queryState } from '../../recoil/atoms';
import SettingsDialog from './SettingsDialog';
import DDBGLogo from '../../assets/dresden_db_group_logo.svg';

interface HideOnScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ResultsNavbar() {
  const [tabValue, setTabValue] = React.useState<number>(0);
  const [query, setQuery] = useRecoilState(queryState);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const colorMode = React.useContext(ColorModeContext);
  const configs = useRecoilValue(configsState);
  const {
    default: defaultAllowed, separated: separatedAllowed, url: urlAllowed, file: fileAllowed,
  } = configs.allowed_search_modes;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const mapping: { [key: number]: QueryMode } = {
      0: 'default',
      1: 'separated',
      2: 'url',
      3: 'file',
    };
    const mode = mapping[newValue];
    setTabValue(newValue);
    setQuery({ ...query, mode });
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: 'secondary.main',
          }}
        >

          <Toolbar>
            <Box sx={{
              display: 'block', height: '32px', width: '32px', paddingRight: '64px',
            }}
            >
              <img src={DDBGLogo} alt="Dresden DB Group" />
            </Box>
            <TabPanel value={tabValue} index={0}>
              <NavbarSearchInput placeholder="Default" />
            </TabPanel>

            {separatedAllowed && (
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', m: 0, p: 0 }}>
                  <NavbarSearchInput placeholder="Code" />
                  <NavbarSearchInput placeholder="Equation" />
                </Box>
              </TabPanel>
            )}

            {urlAllowed && (
              <TabPanel value={tabValue} index={2}>
                <NavbarSearchInput placeholder="URL" />
              </TabPanel>
            )}

            {fileAllowed && (
              <TabPanel value={tabValue} index={3}>
                <NavbarSearchInput placeholder="File" />
              </TabPanel>
            )}

            <Button variant="contained">Go</Button>

            <Box sx={{ flexGrow: 1 }} />

            <ThemeSwitch onClick={colorMode.toggleColorMode} />

            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              onClick={() => setIsDialogOpen(true)}
              sx={{ ml: 2 }}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
          <Toolbar variant="dense">
            <Tabs value={tabValue} onChange={handleTabChange} style={{ height: '32px' }}>
              <Tab disabled={!defaultAllowed} label="Default" />
              <Tab disabled={!separatedAllowed} label="Separated" />
              <Tab disabled={!urlAllowed} label="ID or URL" />
              <Tab disabled={!fileAllowed} label="File" />
            </Tabs>
          </Toolbar>

        </AppBar>
      </HideOnScroll>
      <SettingsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
}
