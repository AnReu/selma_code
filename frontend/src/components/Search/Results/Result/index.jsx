// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';

import {
  ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Markdown from '../../../Markdown';

const useStyles = makeStyles(() => ({
  heading: {
    flexBasis: '33.3%',
    flexShrink: 0,
    flexGrow: 1,
  },
  formControl: {
    paddingRight: '2%',
  },
  expansionPanelDetails: {
    flexDirection: 'column',
  },
}));

const Result = ({
  result, expanded, onExpand, onRelevanceCheck,
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      expanded={expanded === result.id}
      onChange={onExpand(result.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.exp}>
        <div className={classes.heading}>
          <Markdown text={`Document: ${result.relevant_sentence} ...`} />
        </div>
        <FormControl
          onChange={(event) => onRelevanceCheck(result.id, event.target.value)}
          className={classes.formControl}
          component="fieldset"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
        >
          <FormLabel component="legend">Relevant?</FormLabel>
          <RadioGroup row aria-label="position" name="position">
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="No"
              labelPlacement="start"
            />
            <FormControlLabel
              value="yes"
              control={<Radio color="primary" />}
              label="Yes"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Markdown text={result.text} />
        <div>
          <RouterLink to={`/document/${result.id}`} target="_blank">
            Full Document
          </RouterLink>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Result;
