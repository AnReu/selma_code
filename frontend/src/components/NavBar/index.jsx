// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */
import React from 'react';
import {
  AppBar, Button, FormControl, InputLabel, MenuItem, Select, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavTitle from './NavTitle';
import QueryTemplatePicker from '../QueryTemplate/Picker';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 160,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const {
    headings,
    models,
    templates,
    onModelChange,
    onModelLanguageChange,
    onDeleteTemplate,
  } = props;

  const [modelLanguage, setModelLanguage] = React.useState('');
  const [model, setModel] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

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

  const handleSelectTemplate = (selected) => {
    setModel(selected.modelName);
    setModelLanguage(selected.modelLanguage);
    setIsOpen(false);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {headings.map((heading, i) => <NavTitle heading={heading} key={i} />)}
        <div className={classes.grow} />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
        >
          Query Examples
        </Button>
        <QueryTemplatePicker
          isOpen={isOpen}
          templates={templates}
          onClose={() => setIsOpen(false)}
          onDeleteTemplate={(template) => onDeleteTemplate(template)}
          onSelect={(template) => handleSelectTemplate(template)}
        />
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
}

export default NavBar;
