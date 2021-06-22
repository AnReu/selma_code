// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Box, CircularProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Markdown from '../Markdown';

const styles = () => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      document: null,
    };
  }

  componentDidMount() {
    const {
      onError,
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    fetch(`${'/api/v1/document?'
      + 'id='}${encodeURIComponent(id)}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error('Bad status code!');
        }
        return response.json();
      })
      .then((json) => this.setState({
        isLoading: false,
        document: json.document,
      }))
      .catch((e) => {
        this.setState({
          isLoading: false,
          document: null,
        });
        console.error(e);
        onError();
      });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, document } = this.state;

    return (
      <Paper>
        <Box p={2}>
          {isLoading
            ? <div className={classes.progress}><CircularProgress /></div>
            : <Markdown text={document} />}
        </Box>
      </Paper>
    );
  }
}

Document.propTypes = {
  match: propTypes.object.isRequired,
  classes: propTypes.any.isRequired,
  onError: propTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(Document));
