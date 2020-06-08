import React, { Component } from 'react';

import { Box, CircularProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MathJax from 'react-mathjax3';
import { withRouter } from "react-router-dom";

const styles = theme => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  }
});

class Document extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      document: null,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch('/api/v1/document?' +
      'id=' + encodeURIComponent(id))
      .then(response => {
        if (response.status !== 200) {
          throw Error('Bad status code!');
        }
        return response.json();
      })
      .then(json =>
        this.setState({
          isLoading: false,
          document: json.document
        }))
      .catch((e) => {
        this.setState({
          isLoading: false,
          document: null,
        });
        console.log(e);
        this.props.onError();
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Box p={2}>
        {this.state.isLoading
          ? <div className={classes.progress}><CircularProgress /></div>
          : <MathJax.Context
              input='tex'
              options={{
                tex2jax: {
                  inlineMath: [['$', '$'], ['\\(', '\\)']],
                  displayMath: [['$$', '$$'], ['\\[', '\\]']],
                  processEscapes: true,
                }
              }}
            >
              <MathJax.Html html={ this.state.document } />
            </MathJax.Context>
        }
        </Box>
      </Paper>
    );
  }
}

export default withStyles(styles)(withRouter(Document))