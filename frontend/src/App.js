import React, { Component } from 'react';

import { Box, Container, Snackbar } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Document from './components/Document';
import NavBar from './components/NavBar';
import Search from './components/Search';
import './App.css'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      defaultErrorMessage: 'There was an error fetching the data!',
      errorMessage: null,
      modelLanguage: 'english',
    };

    this.handleError = this.handleError.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.handleModelLanguageChange = this.handleModelLanguageChange.bind(this);
  }

  handleError(errorMessage=null) {
    this.setState({
      showError: true,
      errorMessage: errorMessage,
    })
  }

  handleErrorClose() {
    this.setState({showError: false})
  }

  handleModelLanguageChange(modelLanguage) {
    this.setState({modelLanguage: modelLanguage});
  }

  render() {
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
          <NavBar headings={headings} initialModelLanguage={this.state.modelLanguage} onModelLanguageChange={this.handleModelLanguageChange} />
          <Container style={{marginTop: 20}}>
            <Switch>
              <Route path="/search">
                <Search onError={this.handleError} modelLanguage={this.state.modelLanguage}/>
              </Route>
              <Route path="/document/:id">
                <Document
                  onError={this.handleError}
                />
              </Route>
            </Switch>
            <Box p={1} />
          </Container>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.showError}
            autoHideDuration={6000}
            onClose={this.handleErrorClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>{this.state.errorMessage ? this.state.errorMessage : this.state.defaultErrorMessage}</span>}
          />
        </div>
      </Router>
    );
  }
}
