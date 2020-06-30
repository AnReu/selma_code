import React, { Component } from 'react';

import { Box, Button, Grid } from '@material-ui/core';

import SearchField from "./Field";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    // Creates object with title names as keys and '' as each value
    const fieldNames = Array.from(props.titles, m => {return {[m.name]: ''}});
    this.state = Object.assign({}, ...fieldNames);

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange = (value, title) => {
    this.setState({
      [title.name]: value,
    });

    if (title.name === 'mono_search') {
      let code, equations, replacer = '```';
      [code, value] = this.getAndReplaceCode(value, replacer);
      [equations, value] = this.getAndReplaceEquations(value, replacer);

      value = value.split(replacer).filter(element => !['\n', ''].includes(element));

      this.props.onQueryChange(code, 'code');
      this.props.onQueryChange(equations, 'equations');
    }
    this.props.onQueryChange(value, title.query_key);
  };

  getAndReplaceCode = (text, replacer='') => {
    const regex_inline = RegExp(/```([^(?:`{3})]*)```/, 'gm');
    const regex_block = RegExp(/^```.*$([^(?:`{3})]*)^```$/, 'gm');

    let matches = [...text.matchAll(regex_inline)];
    matches.push(...text.matchAll(regex_block));

    text = text.replace(regex_inline, replacer);
    text = text.replace(regex_block, replacer);

    matches = this.getSortedMatches(matches);

    return [matches, text];
  }

  getAndReplaceEquations = (text, replacer='') => {
    const regex_inline = RegExp(/\$(\S.*\S|\S)\$/, 'gm');
    const regex_block = RegExp(/\$\$([\s\S]*)\$\$/, 'gm');

    let matches = [...text.matchAll(regex_block)];
    text = text.replace(regex_block, replacer);
    matches.push(...text.matchAll(regex_inline));
    text = text.replace(regex_inline, replacer);

    matches = this.getSortedMatches(matches);

    return [matches, text];
  }

  getSortedMatches = (matches) => {
    matches.sort((a, b) => {
      return a.index < b.index ? -1 : 1;
    });

    return Array.from(matches, m => m[1]);
  }

  render() {
    return (
      <div hidden={this.props.tabValue !== this.props.tabIndex}>

        <Grid container spacing={2}>
          <Grid item md={4} sm={6} xs={12}>
            <Grid container direction='column' spacing={1}>
              {this.props.titles.map((title, i) =>
                <Grid item key={i}>
                  <SearchField
                    title={title}
                    onQueryChange={(event) =>
                      this.handleQueryChange(event, title)
                    }
                    onEnter={this.props.onSearch}
                    validation={this.props.validation}
                    multiline={this.props.multiline}
                  />
                </Grid>
              )}

              <Box p={1} />

            </Grid>

            <Button
              variant="contained"
              onClick={this.props.onSearch}
            >Search</Button>
          </Grid>
          {this.props.child &&
            this.props.child(this.state)}
        </Grid>

        <Box p={1} />

      </div>
    );
  }
};