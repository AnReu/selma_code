import React from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ResultsPage from './ResultsPage';
import HomePage from './HomePage';
import MainLayout from './layouts/MainLayout';
import { ColorModeContext } from './ColorModeContext';
import SeparatedSearchPage from './SeparatedSearchPage';
import URLSearchPage from './URLSearchPage';

const mathJaxConfig = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

// export const gruvbox = {
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#d79921',
//     },
//     secondary: {
//       main: '#458588',
//     },
//     background: {
//       default: '#282828',
//       paper: '#3c3836',
//     },
//     error: {
//       main: '#fb4934',
//     },
//     warning: {
//       main: '#fabd2f',
//     },
//     info: {
//       main: '#83a598',
//     },
//     success: {
//       main: '#b8bb26',
//     },
//   },
// };

// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#bd93f9',
//     },
//     secondary: {
//       main: '#ff79c6',
//     },
//     background: {
//       default: '#44475a',
//       paper: '#282a36',
//     },
//     error: {
//       main: '#ff5555',
//     },
//     warning: {
//       main: '#ffb86c',
//     },
//     success: {
//       main: '#50fa7b',
//     },
//     info: {
//       main: '#8be9fd',
//     },
//     divider: '#8be9fd',
//   },
// });

function Fallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: '64px',
          minWidth: '80%',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </main>
    </Box>
  );
}

export default function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('darkState', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode,
        // primary: {
        //   main: '#bd93f9',
        // },
        // secondary: {
        //   main: '#ff79c6',
        // },
        // background: {
        //   default: '#44475a',
        //   paper: '#282a36',
        // },
        // error: {
        //   main: '#ff5555',
        // },
        // warning: {
        //   main: '#ffb86c',
        // },
        // success: {
        //   main: '#50fa7b',
        // },
        // info: {
        //   main: '#8be9fd',
        // },
        // divider: '#8be9fd',
      },
    }),
    [mode],
  );

  React.useEffect(() => {
    const existingPreference = localStorage.getItem('darkState');
    if (existingPreference && existingPreference === 'light') {
      colorMode.toggleColorMode();
      localStorage.setItem('darkState', 'light');
    } else {
      localStorage.setItem('darkState', 'dark');
    }
  }, []);

  return (
    <RecoilRoot>
      <RecoilizeDebugger />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<Fallback />}>
            <MathJaxContext config={mathJaxConfig}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="default" element={<HomePage />} />
                  <Route path="separated" element={<SeparatedSearchPage />} />
                  <Route path="url" element={<URLSearchPage />} />
                </Route>
                <Route path="results" element={<ResultsPage />} />
              </Routes>
            </MathJaxContext>
          </React.Suspense>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </RecoilRoot>
  );
}
