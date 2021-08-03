// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';
import {
  AppBar, FormControl, InputLabel, MenuItem, Select, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavTitle from './NavTitle';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  grow: {
    flexGrow: 1,
  },
}));

const NavBar = ({
  headings, initialModelLanguage, initialModel, onModelChange, onModelLanguageChange, models,
}) => {
  const classes = useStyles();
  const [modelLanguage, setModelLanguage] = React.useState(initialModelLanguage);
  const [model, setModel] = React.useState(initialModel);

  const handleChangeModelLanguage = (event) => {
    const { value } = event.target;
    setModelLanguage(value);
    onModelLanguageChange(value);
  };

  const handleChangeModel = (event) => {
    const { value } = event.target;
    setModel(value);
    onModelChange(value);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {headings.map((heading, i) => <NavTitle heading={heading} key={i} />)}
        <div className={classes.grow} />
        <FormControl className={classes.formControl}>
          <InputLabel id="model-label">Model</InputLabel>
          <Select
            labelId="model-label"
            id="model"
            value={model}
            onChange={handleChangeModel}
          >
            {
                // eslint-disable-next-line max-len
                models.map((value, index) => <MenuItem value={value} key={index + value}>{value}</MenuItem>)
              }
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="model-language-label">Model Language</InputLabel>
          <Select
            labelId="model-language-label"
            id="model-language"
            value={modelLanguage}
            onChange={handleChangeModelLanguage}
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="german">German</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
