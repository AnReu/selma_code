import React, { Component } from 'react';

import { Box, Button, Grid } from '@material-ui/core';
import MathJax from 'react-mathjax3';

import SearchField from "./Field";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      equationValue: '',
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.getValidation = this.getValidation.bind(this);
  }

  handleQueryChange = (value, title) => {
    if (title === 'equations') {
      this.setState({
        equationValue: value,
      });
    }
    this.props.onQueryChange(value, title);
  };

  getValidation = (title) => {
    return this.props.validations !== undefined && this.props.validations[title] !== undefined
      ? this.props.validations[title]
      : (value) => value;
  }

  render() {
    return (
      <div hidden={this.props.tabValue !== this.props.tabIndex}>

        <Grid container spacing={2}>
          <Grid item md={4} sm={6} xs={12}>
            <Grid container direction='column' spacing={1}>
              {(this.props.titles || SearchBar.defaultProps.titles).map((title, i) =>
                <Grid item key={i}>
                  <SearchField
                    title={title}
                    onQueryChange={(event) =>
                      this.handleQueryChange(event, title.label)
                    }
                    onEnter={this.props.onSearch}
                    validation={this.getValidation(title.label)}
                  />
                  {title.label === 'equations' &&
                    <MathJax.Context input='tex'>
                      <div>
                        <MathJax.Node>{this.state.equationValue}</MathJax.Node>
                      </div>
                    </MathJax.Context>
                  }
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={this.props.onSearch}
            >Search</Button>
          </Grid>
        </Grid>

        <Box p={1} />

      </div>
    );
  }
};

SearchBar.defaultProps = {
  titles: [
    {
      label: 'text',
      displayLabel: 'Text',
      inputProps: {},
    },
    {
      label: 'code',
      displayLabel: 'Code',
      inputProps: {
        style: {
          fontFamily: 'Ubuntu Mono'
        }
      },
    },
    {
      label: 'equations',
      displayLabel: 'Equations',
      inputProps: {},
    },
  ],
}