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
      error: false,
      show_error: false,
    };

    this.handleError = this.handleError.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
  }

  handleError() {
    this.setState({
      error: true,
      show_error: true,
    })
  }

  handleErrorClose() {
    this.setState({show_error: false})
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
    const errorMessage = 'There was an error fetching the data!';

    return (
      <Router>
        <div className="App">
          <NavBar headings={headings}/>
          <Container style={{marginTop: 20}}>
            <Switch>
              <Route path="/search">
                <Search onError={this.handleError} />
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
            open={this.state.show_error}
            autoHideDuration={6000}
            onClose={this.handleErrorClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>{errorMessage}</span>}
          />
        </div>
      </Router>
    );
  }
}
