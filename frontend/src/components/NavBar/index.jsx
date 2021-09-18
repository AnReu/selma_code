// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */
import React from 'react';
import {
  AppBar, Button, FormControl, InputLabel, MenuItem, Select, Toolbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import NavTitle from './NavTitle';
import QueryTemplatePicker from '../QueryTemplate/Picker';
import actions from '../../actions';

// TODO: fix styling
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 160,
    marginLeft: 32,
    marginRight: 32,
    backgroundColor: 'red',
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function NavBar(props) {
  // Styles
  const classes = useStyles();

  // Props
  const {
    headings,
    models,
    onDeleteTemplate,
  } = props;

  // Hooks
  const language = useSelector((state) => state.language);
  const model = useSelector((state) => state.model);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  // Handlers
  const handleChangeModelLanguage = (event) => {
    const { value } = event.target;
    dispatch(actions.setLanguage(value));
    // TODO: check which function should be called here
    // onModelLanguageChange(value);
  };
  const handleChangeModel = (event) => {
    const { value } = event.target;
    dispatch(actions.setModel(value));
    // TODO: check which function should be called here
    // onModelChange(value);
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
          onClose={() => setIsOpen(false)}
          onDeleteTemplate={(template) => onDeleteTemplate(template)}
        />
        <FormControl variant="standard" className={classes.formControl}>
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

        <FormControl variant="standard" className={classes.formControl}>
          <InputLabel id="model-language-label">Model Language</InputLabel>
          <Select
            labelId="model-language-label"
            id="model-language"
            value={language}
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
