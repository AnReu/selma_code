import React, { Component } from 'react';

import { CircularProgress } from '@material-ui/core';
import MathJax from 'react-mathjax3';
import { withRouter } from "react-router-dom";

class Document extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      document: null,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch('/document?' +
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
          document: json
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
    return (
      <React.Fragment>
        {this.state.isLoading
          ? <CircularProgress />
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
      </React.Fragment>
    );
  }
}

export default withRouter(Document)