import React from 'react';
import Grid from '@mui/material/Grid';
import { MathJaxContext } from 'better-react-mathjax';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import SearchPage from './features/search/SearchPage';
import StoreSnackbar from './features/snackbar/StoreSnackbar';

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

export default function App() {
  return (
    <RecoilRoot>
      <RecoilizeDebugger />
      <React.Suspense fallback={<div>Loading...</div>}>

        <Grid component="main" container sx={{ bgcolor: (theme) => theme.palette.background.paper, height: '100%' }}>
          <Grid item xs={12}>
            <MathJaxContext config={config}>
              <SearchPage />
              <StoreSnackbar />
            </MathJaxContext>
          </Grid>
        </Grid>

      </React.Suspense>
    </RecoilRoot>
  );
}
