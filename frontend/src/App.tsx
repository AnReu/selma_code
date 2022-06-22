import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { MathJaxContext } from 'better-react-mathjax';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import SearchPage from './features/search/SearchPage';
import AboutPage from './features/AboutPage';
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
        <BrowserRouter>
          <Grid component="main" container sx={{ bgcolor: (theme) => theme.palette.background.paper, height: '100%' }}>
            <Grid item xs={12}>
              <MathJaxContext config={config}>
                <Switch>
                  <Route path="/about" component={AboutPage} />
                  <Route path="/search" component={SearchPage} />
                  <Route exact path="/" component={SearchPage} />
                </Switch>
                <StoreSnackbar />
              </MathJaxContext>
            </Grid>
          </Grid>
        </BrowserRouter>
      </React.Suspense>
    </RecoilRoot>
  );
}
