// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';
import {
  AppBar, Button, FormControl, InputBase, InputLabel, MenuItem, Select, Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NavTitle from './NavTitle';
import QueryTemplateDialog from '../QueryTemplateDialog';
import './NavBar.css';

const NavBar = ({
  headings,
  models,
  onModelChange,
  onModelLanguageChange,
  queryTemplates,
}) => {
  const [modelLanguage, setModelLanguage] = React.useState('');
  const [model, setModel] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);
  const [, setQuery] = React.useState('');

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

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleQueryTemplateSelected = (value) => {
    setShowDialog(false);

    const {
      // eslint-disable-next-line no-unused-vars,no-shadow
      id, modelName, modelLanguage, name, queryText,
    } = value;
    setQuery(queryText);

    console.log(value);

    const params = `text=${encodeURIComponent(queryText)}&`
               + `model=${encodeURIComponent(modelName)}&`
               + `model-language=${encodeURIComponent(modelLanguage)}`;

    fetch(`/api/v1/search?${params}`)
      .then((response) => {
        if (![200, 404].includes(response.status)) {
          throw Error('Bad status code!');
        }

        // this.setState({
        //   statusCode: response.status,
        // });

        return response.json();
      })
      .then((json) => {
        console.log(json);
        // if (statusCode === 404) {
        //   throw Error(json.error);
        // }

        // this.setState({
        //   isLoading: false,
        //   results: json.results,
        // });
      })
      .catch((e) => {
        console.log(e);
        // this.setState({
        //   isLoading: false,
        //   results: [],
        // });
        // eslint-disable-next-line
        // console.error(e);
        // onError(e.message !== 'Bad status code!' ? e.message : null);
      });
    // searchExample(value);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {headings.map((heading, i) => <NavTitle heading={heading} key={i} />)}
        <div className="grow" />
        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            className="inputBase"
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Button className="example-button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenDialog}>
          Examples
        </Button>
        <QueryTemplateDialog
          open={showDialog}
          models={models}
          templates={queryTemplates}
          onClose={handleCloseDialog}
          onSelect={handleQueryTemplateSelected}
        />
        <div className="grow" />
        <FormControl className="formControl">
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

        <FormControl className="formControl">
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
