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
    onModelChange,
    onModelLanguageChange,
  } = props;

  const [modelLanguage, setModelLanguage] = React.useState('');
  const [model, setModel] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [queryTemplates, setQueryTemplates] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/v1/query-templates')
      .then((response) => response.json())
      .then((fetchedTemplates) => setQueryTemplates(fetchedTemplates));
  }, []);

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

  const handleDeleteTemplate = (template) => {
    const { id } = template;
    fetch(`/api/v1/query-templates/${id}`, { method: 'DELETE' })
      .then(() => {
        // remove deleted template from queryTemplates
        const templatesCopy = [...queryTemplates]; // make a separate copy of the array
        const index = templatesCopy.indexOf(template);

        if (index !== -1) {
          templatesCopy.splice(index, 1);
          setQueryTemplates(templatesCopy);
        }
      })
      .catch((e) => {
        console.error(e);
      });
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
          templates={queryTemplates}
          onDeleteTemplate={handleDeleteTemplate}
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
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="German">German</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
