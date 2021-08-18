// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React, { useState } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchField from './Field';
import QueryTemplateCreator from '../../QueryTemplate/Creator';

const useStyles = makeStyles(() => ({
  buttons: {
    margin: 8,
  },
}));

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

function SearchBar(props) {
  const classes = useStyles();
  const {
    model,
    modelLanguage,
    tabValue,
    tabIndex,
    titles,
    onSearch,
    validation,
    multiline,
    child,
    onQueryChange,
  } = props;

  const fieldNames = Array.from(titles, (m) => ({ [m.name]: '' }));

  const [fields, setFields] = useState(Object.assign({}, ...fieldNames));
  const [isOpen, setIsOpen] = useState(false);

  const handleQueryChange = (value, title) => {
    const fieldsCopy = { ...fields };
    fieldsCopy[title.name] = value;
    setFields(fieldsCopy);

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
  };

  return (
    <div hidden={tabValue !== tabIndex}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Grid container direction="column" spacing={1}>
            {titles.map((title, i) => (
              <Grid item key={i}>
                <SearchField
                  title={title}
                  onChange={(event) => handleQueryChange(event, title)}
                  onEnter={onSearch}
                  validation={validation}
                  multiline={multiline}
                />
              </Grid>
            ))}

            <Box p={1} />

          </Grid>

          <Button
            className={classes.buttons}
            variant="contained"
            onClick={onSearch}
          >
            Search
          </Button>
          <Button
            className={classes.buttons}
            variant="contained"
            onClick={() => setIsOpen(true)}
          >
            Create Query Template
          </Button>
        </Grid>
        {child
            && child(fields)}
      </Grid>

      <Box p={1} />

      <QueryTemplateCreator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentQueryText={fields.mono_search}
        currentModelLanguage={modelLanguage}
        currentModel={model}
        onCreateTemplate={}
      />

    </div>
  );
}

export default SearchBar;
