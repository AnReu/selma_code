// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React, { useState } from 'react';
import {
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
// import QueryTemplateCreator from '../../QueryTemplate/Creator';

// Auxiliary functions
const useStyles = makeStyles(() => ({
  buttons: {
    margin: 8,
  },
  icon: {
    padding: '6px',
  },
  label: {
    marginTop: '10px',
  },
}));

function MainSearchField(props) {
  // Styles
  const classes = useStyles();
  const { tabValue, tabIndex } = props;
  const multiline = true;
  const [value] = useState('valuuuue');

  return (
    <div hidden={tabValue !== tabIndex}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel className={classes.label}>title.label</InputLabel>
                <Input
                  value={value}
                  fullWidth
                  multiline={multiline}
                  maxRows="10"
                  endAdornment={(
                    <IconButton className={classes.icon}>
                      <ClearIcon />
                    </IconButton>
                    )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainSearchField;
