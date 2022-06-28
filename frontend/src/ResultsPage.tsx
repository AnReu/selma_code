import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs/Tabs';
import Tab from '@mui/material/Tab/Tab';
import Button from '@mui/material/Button/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import useScrollTrigger from '@mui/material/useScrollTrigger/useScrollTrigger';
import Slide from '@mui/material/Slide/Slide';
import SearchResult from './features/search/SearchResult';
import { ColorModeContext } from './ColorModeContext';
import SettingsDialog from './features/navbar/SettingsDialog';
import { ThemeSwitch } from './ThemeSwitch';
import { configsState } from './recoil/selectors';
import { QueryMode, queryParametersState } from './recoil/atoms';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export interface Result {
  acceptedAnswerId?: number | null;
  body: string;
  id: number;
  parentId?: number;
  postTypeId?: number;
  title: string;
  tags: string | null;
  cut: boolean;
  relevantSentence: string;
  language?: string;
  comment?: string;
  url?: string;
}

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useRecoilState(queryParametersState);
  const text = searchParams.get('text');
  const db = searchParams.get('db');
  const model = searchParams.get('model');
  const index = searchParams.get('index');

  const [results, setResults] = React.useState<Result[] | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [endIndex] = React.useState(10);
  const [tabValue, setTabValue] = React.useState(0);

  const colorMode = React.useContext(ColorModeContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    const getResults = async () => {
      const URL = 'http://127.0.0.1:5000/api/v1/search?'
        + `text=${text}&`
        + `db=${db}&`
        + `model=${model}&`
        + `index=${index}&`
        + 'model-language=english&';

      const response = await fetch(URL);
      const data = await response.json();

      setResults(data.results);
      setIsLoading(false);
    };

    getResults();
  }, [searchParams]);

  if (isLoading) return <CircularProgress />;

  return (

    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      bgcolor: 'background.paper',
    }}
    >
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: 'secondary.main',
          }}
        >

          <Toolbar>
            <TabPanel value={tabValue} index={0}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </TabPanel>

            {separatedAllowed && (
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', m: 0, p: 0 }}>
                  <Search sx={{ marginRight: 4 }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Code"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                  <Search sx={{ marginRight: 4 }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Equation"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Box>
              </TabPanel>
            )}

            {urlAllowed && (
              <TabPanel value={tabValue} index={2}>
                <Search sx={{ marginRight: 4 }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="URL"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </TabPanel>
            )}

            {fileAllowed && (
              <TabPanel value={tabValue} index={3}>
                <Search sx={{ marginRight: 4 }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="File"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
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
      <Container maxWidth="md">
        <main style={{
          maxWidth: 'sm',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '135px',
          paddingTop: '12px',
        }}
        >
          {results!.slice(0, endIndex).map(
            (result) => <SearchResult key={result.id} result={result} />,
          )}
        </main>
      </Container>

      <SettingsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box>
  );
}
