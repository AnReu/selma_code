import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { MathJaxContext } from 'better-react-mathjax';
import SearchPage from './features/search/SearchPage';
import AboutPage from './features/AboutPage';
import StoreSnackbar from './features/snackbar/StoreSnackbar';
import ConfigsPage from './features/user/ConfigsPage';

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
    <BrowserRouter>
      <Grid component="main" container sx={{ bgcolor: (theme) => theme.palette.background.paper, height: '100%' }}>
        <Grid item xs={12}>
          <MathJaxContext config={config}>
            <Switch>
              <Route path="/about" component={AboutPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/settings" component={ConfigsPage} />
              <Route exact path="/" component={SearchPage} />
            </Switch>
            <StoreSnackbar />
          </MathJaxContext>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}