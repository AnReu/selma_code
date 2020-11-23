import React from 'react';

import { AppBar, FormControl, InputLabel, MenuItem, Select, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NavTitle from "./NavTitle";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 0,
    minWidth: 160,
  },
}));

const NavBar = ({ headings, initialModelLanguage, onModelLanguageChange }) => {
  const classes = useStyles();
  const [modelLanguage, setModelLanguage] = React.useState(initialModelLanguage);

  const handleChange = (event) => {
    let value = event.target.value;
    setModelLanguage(value);
    onModelLanguageChange(value);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {headings.map((heading, i) =>
          <NavTitle heading={heading} key={i} />
        )}

        <FormControl className={classes.formControl}>
          <InputLabel id="model-language-label">Model Language</InputLabel>
          <Select
            labelId="model-language-label"
            id="model-language"
            value={modelLanguage}
            onChange={handleChange}
          >
            <MenuItem value={'english'}>English</MenuItem>
            <MenuItem value={'german'}>German</MenuItem>
          </Select>
        </FormControl>

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;