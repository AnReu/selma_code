// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React, { Component } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import SearchField from './Field';

function getSortedMatches(matches) {
  matches.sort((a, b) => (a.index < b.index ? -1 : 1));

  return Array.from(matches, (m) => m[1]);
}

function getAndReplaceCode(text, replacer = '') {
  const regexInline = RegExp(/```([^(?:`{3})]*)```/, 'gm');
  const regexBlock = RegExp(/^```.*$([^(?:`{3})]*)^```$/, 'gm');

  let matches = [...text.matchAll(regexInline)];
  matches.push(...text.matchAll(regexBlock));

  let tempText = text.replace(regexInline, replacer);
  tempText = tempText.replace(regexBlock, replacer);

  matches = getSortedMatches(matches);

  return [matches, tempText];
}

function getAndReplaceEquations(text, replacer = '') {
  const regexInline = RegExp(/\$(\S.*\S|\S)\$/, 'gm');
  const regexBlock = RegExp(/\$\$([\s\S]*)\$\$/, 'gm');

  let matches = [...text.matchAll(regexBlock)];
  let tempText = text.replace(regexBlock, replacer);
  matches.push(...text.matchAll(regexInline));
  tempText = tempText.replace(regexInline, replacer);

  matches = getSortedMatches(matches);

  return [matches, tempText];
}

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    // Creates object with title names as keys and '' as each value
    const fieldNames = Array.from(props.titles, (m) => ({ [m.name]: '' }));
    this.state = Object.assign({}, ...fieldNames);

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(value, title) {
    const { onQueryChange } = this.props;
    this.setState({
      [title.name]: value,
    });

    let tempValue = null;

    if (title.name === 'mono_search') {
      const replacer = '```';
      const [code] = getAndReplaceCode(value, replacer);
      const [equations] = getAndReplaceEquations(value, replacer);

      tempValue = value.split(replacer).filter((element) => !['\n', ''].includes(element));

      onQueryChange(code, 'code');
      onQueryChange(equations, 'equations');
    }
    onQueryChange(tempValue, title.query_key);
  }

  render() {
    const {
      tabValue, tabIndex, titles, onSearch, validation, multiline, child,
    } = this.props;

    return (
      <div hidden={tabValue !== tabIndex}>

        <Grid container spacing={2}>
          <Grid item md={4} sm={6} xs={12}>
            <Grid container direction="column" spacing={1}>
              {titles.map((title, i) => (
                <Grid item key={i}>
                  <SearchField
                    title={title}
                    onQueryChange={(event) => this.handleQueryChange(event, title)}
                    onEnter={onSearch}
                    validation={validation}
                    multiline={multiline}
                  />
                </Grid>
              ))}

              <Box p={1} />

            </Grid>

            <Button
              variant="contained"
              onClick={onSearch}
            >
              Search
            </Button>
          </Grid>
          {child
            && child(this.state)}
        </Grid>

        <Box p={1} />

      </div>
    );
  }
}
