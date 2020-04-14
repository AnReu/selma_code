import React, { Component } from 'react';

import { Button, Grid } from '@material-ui/core';
import MathJax from 'react-mathjax2';

import SearchField from "./Field";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [
        {
          label: 'Text',
          inputProps: {},
        },
        {
          label: 'Code',
          inputProps: {
            style: {
              fontFamily: 'Ubuntu Mono'
            }
          },
        },
        {
          label: 'Equations',
          inputProps: {},
          value: '',
        },
      ]
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange = (event, title) => {
    const value = event.target.value;
    if (title === 'equations') {
      this.setState(state => {
        let titles = [...state.titles];
        titles[2].value = value;
        return {titles: titles};
      });
    }
    this.props.onQueryChange(value, title)
  };

  render() {
    return (
      <div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction='column' spacing={1}>
              {this.state.titles.map((title, i) =>
                <Grid item key={i}>
                  <SearchField
                    title={title}
                    onQueryChange={(event) =>
                      this.handleQueryChange(event, title.label.toLowerCase())
                    }
                  />
                  {title.label === 'Equations' &&
                    <MathJax.Context input='tex'>
                      <div>
                        <MathJax.Node>{title.value}</MathJax.Node>
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

      </div>
    );
  }
};