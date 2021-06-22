import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Container, Fab, Snackbar,
} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Document from './components/Document';
import NavBar from './components/NavBar';
import Search from './components/Search';
import './App.css';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function App() {
  const [showError, setShowError] = React.useState(false);
  const [defaultErrorMessage] = React.useState('There was an error fetching the data!');
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [modelLanguage, setModelLanguage] = React.useState('english');
  const [model, setModel] = React.useState('vector');
  const [models, setModels] = React.useState([]);

  React.useEffect(() => {
    fetch('api/v1/models')
      .then((response) => response.json())
      .then((fetchedModels) => setModels(fetchedModels));
  });

  const handleError = (errorMsg) => {
    setShowError(true);
    setErrorMessage(errorMsg);
  };

  const classes = useStyles();
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
          onClose={() => { setShowError(false); }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>{errorMessage || defaultErrorMessage}</span>}
        />
        <Fab className={classes.fab} aria-label="add template">
          <FavoriteIcon />
        </Fab>
      </div>
    </Router>
  );
}
