import React from 'react';
import {
  Box,
  Container,
  Snackbar,
} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Document from './components/Document';
import NavBar from './components/NavBar';
import Search from './components/Search';
import './App.css';

export default function App() {
  const [showError, setShowError] = React.useState(false);
  const [defaultErrorMessage] = React.useState('There was an error fetching the data!');
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [modelLanguage, setModelLanguage] = React.useState('english');
  const [model, setModel] = React.useState('PyterrierModel');
  const [models, setModels] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [languages, setLanguages] = React.useState([]);
  const [queryTemplates, setQueryTemplates] = React.useState([]);

  React.useEffect(() => {
    fetch('api/v1/models')
      .then((response) => response.json())
      .then((fetchedModels) => setModels(fetchedModels));

    fetch('api/v1/languages')
      .then((response) => response.json())
      .then((fetchedLanguages) => setLanguages(fetchedLanguages));

    fetch('api/v1/query-templates')
      .then((response) => response.json())
      .then((fetchedTemplates) => setQueryTemplates(fetchedTemplates));
  }, []);

  const handleCloseSnackbar = () => {
    setShowError(false);
  };

  const handleError = (errorMsg) => {
    setShowError(true);
    setErrorMessage(errorMsg);
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
          initialModel={model}
          initialModelLanguage={modelLanguage}
          onModelChange={setModel}
          onModelLanguageChange={setModelLanguage}
          models={models}
          queryTemplates={queryTemplates}
        />
        <Container style={{ marginTop: 20 }}>
          <Box my={4}>
            <Switch>
              <Route path="/search">
                <Search onError={handleError} model={model} modelLanguage={modelLanguage} />
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
          open={showError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>{errorMessage || defaultErrorMessage}</span>}
        />
      </div>
    </Router>
  );
}
