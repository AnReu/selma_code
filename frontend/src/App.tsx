import React from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchPage from './features/search/SearchPage';
import StoreSnackbar from './features/snackbar/StoreSnackbar';
import ResultsPage from './ResultsPage';
import HomePage from './HomePage';

const config = {
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

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d79921',
    },
    secondary: {
      main: '#458588',
    },
    background: {
      default: '#282828',
      paper: '#3c3836',
    },
    error: {
      main: '#fb4934',
    },
    warning: {
      main: '#fabd2f',
    },
    info: {
      main: '#83a598',
    },
    success: {
      main: '#b8bb26',
    },
  },
});

export default function App() {
  return (
    <RecoilRoot>
      <RecoilizeDebugger />
      <React.Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
          <MathJaxContext config={config}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="results" element={<ResultsPage />} />
            </Routes>
            <StoreSnackbar />
          </MathJaxContext>
        </ThemeProvider>
      </React.Suspense>
    </RecoilRoot>
  );
}
