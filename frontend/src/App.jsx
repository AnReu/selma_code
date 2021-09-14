/* eslint-disable no-underscore-dangle,no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Snackbar,
} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Document from './components/Document';
import NavBar from './components/NavBar';
import Search from './components/Search';
import { useGetQueryTemplatesQuery } from './services/queryTemplates';
import { useGetLanguagesQuery } from './services/languages';
import { useGetModelsQuery } from './services/models';
import './App.css';

export default function App() {
  const [showError, setShowError] = React.useState(false);

  const {
    data: models = [],
    // isLoading = false,
    // isSuccess = false,
    isError = false,
    error: modelsError = {},
  } = useGetModelsQuery();

  const { data: languages = [], isError: isErrorLanguage = {} } = useGetLanguagesQuery();

  const { data: templates = [], isError: isErrorTemplate = {} } = useGetQueryTemplatesQuery();

  const handleCloseSnackbar = () => {
    setShowError(false);
  };

  const handleError = (errorMsg) => {
    setShowError(true);
    // setErrorMessage(errorMsg);
  };

  const handleSelectTemplate = () => {
    throw Error('implement me');
  };

  const headings = [
    {
      name: 'RETRIEVAL',
      route: '',
    },
    {
      name: 'Search',
      route: 'search',
    },
    {
      name: 'About',
      route: 'about',
    },
  ];

  return (
    <Router>
      <div className="App">
        <NavBar
          headings={headings}
          onSelectTemplate={(template) => handleSelectTemplate(template)}
          models={models}
        />
        <Container style={{ marginTop: 20 }}>
          <Box my={4}>
            <Switch>
              <Route path="/search">
                <Search
                  onError={handleError}
                />
              </Route>
              <Route path="/document/:id">
                <Document
                  onError={handleError}
                />
              </Route>
            </Switch>
          </Box>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>There was an error fetching the data! Please see console.</span>}
        />
      </div>
    </Router>
  );
}
