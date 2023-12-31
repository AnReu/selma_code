import React, { FormEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs/Tabs';
import Tab from '@mui/material/Tab/Tab';
import Button from '@mui/material/Button/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger/useScrollTrigger';
import Slide from '@mui/material/Slide/Slide';
import Box from '@mui/material/Box/Box';
import { useRecoilState } from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavbarSearchInput from './NavbarSearchInput';
import { QueryMode, queryState } from '../../recoil/atoms';
import SelmaLogo from '../../assets/SELMA-Logo_code.svg';
import SystemSettings from './SystemSettings';

interface HideOnScrollProps {
  // TODO: remove this code
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
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState<number>(0);
  const [query, setQuery] = useRecoilState(queryState);
  const [, setSearchParams] = useSearchParams();
  // TODO: review non-null assertion operator (aka !)
  const [text, setText] = React.useState(query.text!);

  const logoClass = theme.palette.mode === 'light' ? 'dark-logo' : 'light-logo';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSearchParams({
      text,
      database: query.database,
      model: query.model,
      index: query.index,
      language: query.language,
      page: '1',
    });
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: 'secondary.main',
          }}
        >

          <Toolbar>
            <Box sx={{
              display: 'block',
              height: '32px',
              width: '32px',
              paddingRight: '64px',
            }}
            >
              <Link to={{ pathname: '/' }} style={{ textDecoration: 'none', color: '#ffffff' }}>
                <Stack direction="row">
                  <img
                    className={logoClass}
                    src={SelmaLogo}
                    alt="Selma retrieval system"

                  />
                  <Typography variant="h6" sx={{ ml: 2 }}>SELMA</Typography>
                </Stack>
              </Link>
            </Box>
            <TabPanel value={tabValue} index={0}>

              <Box
                onSubmit={handleSubmit}
                component="form"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <NavbarSearchInput
                  value={text!} // TODO: review non-null assertion operator (aka !)
                  onChange={handleChange}
                  placeholder="Search"
                />
                <Button type="submit" variant="contained">Go</Button>
              </Box>

            </TabPanel>

            <Box sx={{ flexGrow: 1 }} />

            <SystemSettings />
          </Toolbar>

          <Toolbar variant="dense">
            <Tabs value={tabValue} onChange={handleTabChange} style={{ height: '32px' }}>
              <Tab label="Default" />
            </Tabs>
          </Toolbar>

        </AppBar>
      </HideOnScroll>
    </>
  );
}
